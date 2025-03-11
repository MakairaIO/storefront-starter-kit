import { NextRequest, NextResponse } from 'next/server'

export function middleware(req) {
  const pathname = req.nextUrl.pathname

  const pattern = /^(.*)$/

  if (pattern.test(pathname)) {
    const url = req.nextUrl.clone()

    const seoUrl = url.pathname

    url.searchParams.set('seoUrl', seoUrl)

    req.nextUrl.searchParams.forEach((value, key) => {
      url.searchParams.set(key, value)
    })

    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}
