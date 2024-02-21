import {
  type FetchType,
  type RequestBuilderMapping,
  type SearchRequestBuilder,
  type PageRequestBuilder,
  type BaseRequest,
  type BaseRequestBuilder,
  Makaira,
} from '@makaira/storefront-core'
import { NextPageContext } from 'next'
import { parseCookies, setCookie } from 'nookies'
import { ParsedUrlQuery } from 'querystring'

type NextContext = Pick<NextPageContext, 'req' | 'res' | 'query'>
type Cookies = ReturnType<typeof parseCookies>

type BundleParams =
  | {
      bundleId?: undefined
      currentSlot?: never
      slots?: never
    }
  | {
      bundleId: string
      currentSlot: string
      slots: {
        [key: string]: string
      }
    }

class MakairaClient extends Makaira {
  apiInstance = process.env.MAKAIRA_API_INSTANCE
  apiUrl = process.env.MAKAIRA_API_URL
  productsPerPage = parseInt(process.env.PRODUCTS_PER_PAGE, 10)

  request<T extends FetchType>(
    type: T,
    ctx?: NextContext
  ): RequestBuilderMapping[T] {
    const builder = super.request(type)

    if (type === 'search' || type === 'page') {
      if (type === 'search') {
        this.handleSearchParams(builder as SearchRequestBuilder, ctx)
      }

      if (type === 'page') {
        this.handlePageParams(builder as PageRequestBuilder, ctx)
        this.setBundles(builder as PageRequestBuilder, ctx)
      }

      ;(builder as PageRequestBuilder)
        .generateAggregations(this.parseParams(ctx?.query))
        .generateOffset(this.parseParams(ctx?.query))
    }
    this.handleCommonParams(builder, ctx)

    return builder
  }

  private handleCommonParams(
    builder: BaseRequestBuilder<BaseRequest>,
    ctx?: NextContext
  ) {
    builder
      .setConstraint('oi.user.timezone', this.getTimeZone(ctx))
      .setConstraint('oi.user.agent', this.getUserAgent(ctx))
      .setConstraint('oi.user.ip', this.getUserIP(ctx))
      .setConstraint('query.language', 'de')
  }

  private handleSearchParams = (
    builder: RequestBuilderMapping['search'],
    ctx?: NextContext
  ) => {
    if (!ctx) {
      return
    }
    const { query } = ctx
    const params = this.parseParams(query)

    if (params.has('searchPhrase')) {
      builder.setSearchPhrase(params.get('searchPhrase'))
    }
  }

  private handlePageParams = (
    builder: RequestBuilderMapping['page'],
    ctx?: NextContext
  ) => {
    const { query } = ctx
    const params = this.parseParams(query)

    if (params.has('seoUrl')) {
      builder.setUrl(params.get('seoUrl'))
    }
  }

  private parseParams(query?: ParsedUrlQuery): URLSearchParams {
    if (!query && typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search)
    }

    return Object.keys(query).reduce((acc, key) => {
      const value = query[key]
      if (!value) return acc

      if (Array.isArray(value)) {
        value.forEach((v) => acc.append(key, v))
      } else {
        acc.append(key, value)
      }

      return acc
    }, new URLSearchParams())
  }

  //#region Cookie handling
  private getTimeZone(ctx?: NextContext) {
    const cookies: Cookies = parseCookies(ctx)
    const timezone = cookies['timezone'] || ''

    if (typeof window === 'undefined' || timezone.length !== 0) {
      return timezone
    }

    const rawOffset = new Date().getTimezoneOffset() * -1
    const isNegative = rawOffset < 0
    const hours = Math.abs(Math.floor(rawOffset / 60))
    const minutes = Math.abs(rawOffset % 60)

    const tz =
      (isNegative ? '-' : '+') +
      ('00' + hours).slice(-2) +
      ('00' + minutes).slice(-2)

    setCookie(ctx, 'timezone', tz, { path: '/' })

    return tz
  }

  private getUserAgent(ctx?: NextContext) {
    const { userAgent = '' } = parseCookies(ctx)
    if (typeof window === 'undefined' || userAgent.length !== 0 || !ctx) {
      return userAgent
    }

    const ua = ctx.req?.headers['user-agent']
    if (!ua) {
      return ''
    }

    setCookie(ctx, 'userAgent', ua, { path: '/' })

    return ua
  }

  private getUserIP(ctx?: NextContext) {
    if (typeof window !== 'undefined') {
      const cookies = parseCookies()
      if ('ip' in cookies) {
        return cookies.ip
      }
    }
    if (!ctx) {
      return '0.0.0.0'
    }

    let ip = ctx.req?.headers['x-forwarded-for'] || ctx.req.socket.remoteAddress

    if (Array.isArray(ip)) {
      ip = ip[0] as string | undefined
    }

    if (!ip) {
      return '0.0.0.0'
    }

    ip = ip.split(',')[0]
    ip = this.anonymizeIP(ip)

    setCookie(ctx, 'ip', ip, {
      path: '/',
    })

    return ip
  }

  private anonymizeIP(ip: string) {
    return ip.replace(/^(\d+\.\d+).*/, '$1.0.0')
  }

  //#endregion

  //#region Bundles
  private setBundles(builder: PageRequestBuilder, ctx?: NextContext) {
    const params = this.prepareBundleParams(ctx)
    console.log(params)
    const { bundleId, slots } = params
    if (!bundleId) {
      return
    }

    const bundles = {
      [bundleId]: {
        slots,
      },
    }

    builder.setBundles(bundles)
  }

  private prepareBundleParams(ctx?: NextContext): BundleParams {
    const cookies = parseCookies(ctx)
    const params = this.parseParams(ctx?.query)
    const url = params.get('seoUrl')
    const bundle = cookies['bundle']

    if (!bundle) {
      // TODO: get bundle from query
      return {}
    }
    const bundleData = JSON.parse(bundle)
    const seoUrl = url!.replace(/\//g, '')

    const bundleId = params.get('bundleId')
    if (bundleId) {
      bundleData[seoUrl] = Object.fromEntries(params.entries())
      setCookie(ctx, 'bundle', JSON.stringify(bundleData), { path: '/' })
      return bundleData[seoUrl]
    } else if (bundleData[seoUrl]) {
      return bundleData[seoUrl]
    }

    return {}
  }
  //#endregion
}

export const makairaClient = new MakairaClient()
