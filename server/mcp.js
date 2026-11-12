/**
 * MCP endpoint for AI agents (Model Context Protocol, Streamable HTTP).
 *
 * Exposes the public Makaira search, product and recommendation APIs as
 * read-only MCP tools, so agents find products the way the shop presents
 * them. Cart and checkout are intentionally not part of it.
 *
 * Enabled with MCP_ENABLED=true, served on POST /mcp.
 */
const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js')
const {
  StreamableHTTPServerTransport,
} = require('@modelcontextprotocol/sdk/server/streamableHttp.js')
const { z } = require('zod')
const allLanguages = require('../config/allLanguages')
const { version } = require('../package.json')

const API_URL =
  process.env.MAKAIRA_API_URL || process.env.NEXT_PUBLIC_MAKAIRA_API_URL
const API_INSTANCE =
  process.env.MAKAIRA_API_INSTANCE ||
  process.env.NEXT_PUBLIC_MAKAIRA_API_INSTANCE
const SHOP_ID = process.env.NEXT_PUBLIC_SHOP_ID ?? 1
const SHOP_DOMAIN = (process.env.NEXT_PUBLIC_SHOP_DOMAIN || '').replace(
  /\/$/,
  ''
)
const RECOMMENDATION_ID =
  process.env.MCP_RECOMMENDATION_ID || 'similar-products'

const REQUEST_TIMEOUT_MS = 10000
const RATE_LIMIT_PER_MINUTE = Number(process.env.MCP_RATE_LIMIT || 60)
const MAX_RESULTS = 20
const SHORT_DESCRIPTION_LENGTH = 300
const LONG_DESCRIPTION_LENGTH = 2000

const languageValues = allLanguages.map((language) => language.value)
const languageSchema = z
  .enum(languageValues)
  .default(languageValues[0])
  .describe('Shop language')

function stripHtml(text = '') {
  return String(text)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

function truncate(text, length) {
  return text.length > length ? text.slice(0, length).trimEnd() + '…' : text
}

function absoluteUrl(url) {
  if (!url) return null
  if (/^https?:\/\//.test(url)) return url

  return `${SHOP_DOMAIN}/${String(url).replace(/^\//, '')}`
}

function mapProduct(product, descriptionLength = SHORT_DESCRIPTION_LENGTH) {
  const fields = product.fields ?? product

  return {
    id: product.id ?? fields.id,
    title: fields.title,
    manufacturer: fields.manufacturer_title ?? null,
    price: fields.price ?? null,
    url: absoluteUrl(fields.url),
    image: fields.picture_url_main ?? null,
    description: truncate(stripHtml(fields.longdesc), descriptionLength),
  }
}

const MAX_FILTER_VALUES = 30

function flattenCategoryTree(values, parentTitle = '') {
  return Object.values(values ?? {}).flatMap((category) => {
    const title = parentTitle
      ? `${parentTitle} > ${category.title}`
      : category.title

    return [
      { value: category.key, title, count: category.count },
      ...flattenCategoryTree(category.subtree, title),
    ]
  })
}

/**
 * Turns the search aggregations into the filters an agent can apply in a
 * follow-up search: list values for "filters", min/max for "ranges".
 */
function mapFilters(aggregations = {}) {
  return Object.values(aggregations).flatMap((aggregation) => {
    const { key, title, type } = aggregation

    if (type.startsWith('range_slider')) {
      const min = Number(aggregation.min)
      const max = Number(aggregation.max)

      if (!(max > min)) return []

      return [{ key, title, kind: 'range', min, max }]
    }

    const values =
      type === 'categorytree'
        ? flattenCategoryTree(aggregation.values)
        : Object.values(aggregation.values ?? {}).map((value) => ({
            value: value.key,
            count: value.count,
          }))

    if (values.length === 0) return []

    return [
      {
        key,
        title,
        kind: 'list',
        values: values.slice(0, MAX_FILTER_VALUES),
      },
    ]
  })
}

function buildAggregations(filters = {}, ranges = {}) {
  const aggregations = { ...filters }

  for (const [key, { from, to }] of Object.entries(ranges)) {
    if (from !== undefined) aggregations[`${key}_from`] = from
    if (to !== undefined) aggregations[`${key}_to`] = to
  }

  return aggregations
}

function getConstraints(language) {
  return {
    'query.shop_id': SHOP_ID,
    'query.use_stock': true,
    'query.language': language,
  }
}

async function fetchFromMakaira(path, body) {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Makaira-Instance': API_INSTANCE,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })

  if (response.status !== 200) {
    throw new Error(`Makaira API ${path} answered ${response.status}`)
  }

  return response.json()
}

function toolResult(data) {
  return {
    content: [{ type: 'text', text: JSON.stringify(data) }],
    structuredContent: data,
  }
}

function toolError(error) {
  return {
    isError: true,
    content: [{ type: 'text', text: `Request failed: ${error.message}` }],
  }
}

function createServer() {
  const server = new McpServer({ name: 'makaira-storefront', version })

  server.registerTool(
    'search_products',
    {
      title: 'Search products',
      description:
        'Searches the shop catalogue with the shop search, including its ranking and merchandising. Returns matching products with title, price, product page URL, image and a short description, plus the filters available for the result (e.g. manufacturer, colour, category, price range). To narrow down, repeat the search with "filters" (list values by filter key) and/or "ranges" (from/to by filter key), using only keys and values from a previous result.',
      inputSchema: {
        query: z.string().min(1).describe('Search phrase'),
        language: languageSchema,
        limit: z.number().int().min(1).max(MAX_RESULTS).default(10),
        offset: z.number().int().min(0).default(0),
        filters: z
          .record(z.string(), z.array(z.string()).min(1))
          .optional()
          .describe(
            'List filters: filter key -> selected values, e.g. {"manu": ["Core Kiteboarding"]}'
          ),
        ranges: z
          .record(
            z.string(),
            z.object({
              from: z.number().optional(),
              to: z.number().optional(),
            })
          )
          .optional()
          .describe(
            'Range filters: filter key -> {from, to}, e.g. {"price": {"to": 500}}'
          ),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ query, language, limit, offset, filters, ranges }) => {
      try {
        const result = await fetchFromMakaira('/search/public', {
          searchPhrase: query,
          isSearch: true,
          enableAggregations: true,
          aggregations: buildAggregations(filters, ranges),
          count: limit,
          offset,
          constraints: getConstraints(language),
        })

        return toolResult({
          total: result.product?.total ?? 0,
          products: (result.product?.items ?? []).map((item) =>
            mapProduct(item)
          ),
          filters: mapFilters(result.product?.aggregations),
        })
      } catch (error) {
        return toolError(error)
      }
    }
  )

  server.registerTool(
    'get_product',
    {
      title: 'Get product',
      description:
        'Returns the details of one product by its id (from search_products), including the full description.',
      inputSchema: {
        id: z.string().min(1).describe('Product id'),
        language: languageSchema,
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ id, language }) => {
      try {
        const result = await fetchFromMakaira('/documents/public', {
          constraints: getConstraints(language),
          datatype: 'product',
          fields: [],
          ids: [id],
          includeContent: false,
        })
        const items = Array.isArray(result) ? result : (result.items ?? [])

        if (items.length === 0) {
          return toolError(new Error(`Product ${id} not found`))
        }

        return toolResult({
          product: mapProduct(items[0], LONG_DESCRIPTION_LENGTH),
        })
      } catch (error) {
        return toolError(error)
      }
    }
  )

  server.registerTool(
    'get_recommendations',
    {
      title: 'Get recommendations',
      description:
        'Returns products the shop recommends for a given product, e.g. similar products or alternatives.',
      inputSchema: {
        productId: z.string().min(1).describe('Product id'),
        language: languageSchema,
        limit: z.number().int().min(1).max(MAX_RESULTS).default(5),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ productId, language, limit }) => {
      try {
        const result = await fetchFromMakaira('/recommendation/public', {
          constraints: getConstraints(language),
          count: limit,
          recommendationId: RECOMMENDATION_ID,
          productId,
        })

        return toolResult({
          products: (result.items ?? []).map((item) => mapProduct(item)),
        })
      } catch (error) {
        return toolError(error)
      }
    }
  )

  return server
}

/**
 * Small fixed-window limiter per client IP; enough to keep a misbehaving
 * agent from hammering the search API through this endpoint.
 */
const requestCounts = new Map()

function isRateLimited(req) {
  const ip = (req.headers['x-forwarded-for'] || req.ip || '')
    .split(',')[0]
    .trim()
  const window = Math.floor(Date.now() / 60000)
  const key = `${ip}:${window}`
  const count = (requestCounts.get(key) ?? 0) + 1

  requestCounts.set(key, count)

  if (requestCounts.size > 10000) {
    for (const existingKey of requestCounts.keys()) {
      if (!existingKey.endsWith(`:${window}`)) requestCounts.delete(existingKey)
    }
  }

  return count > RATE_LIMIT_PER_MINUTE
}

function jsonRpcError(res, status, code, message) {
  res.status(status).json({
    jsonrpc: '2.0',
    error: { code, message },
    id: null,
  })
}

async function handleMcpRequest(req, res) {
  if (isRateLimited(req)) {
    return jsonRpcError(res, 429, -32000, 'Too many requests')
  }

  // Stateless: a fresh server and transport per request, no sessions.
  const server = createServer()
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  })

  res.on('close', () => {
    transport.close()
    server.close()
  })

  try {
    await server.connect(transport)
    await transport.handleRequest(req, res, req.body)
  } catch (error) {
    console.error('MCP request failed', error)

    if (!res.headersSent) {
      jsonRpcError(res, 500, -32603, 'Internal server error')
    }
  }
}

function registerMcpRoutes(server) {
  if (process.env.MCP_ENABLED !== 'true') return

  server.post('/mcp', handleMcpRequest)
  server.all('/mcp', (req, res) =>
    jsonRpcError(res, 405, -32000, 'Method not allowed')
  )
}

module.exports = {
  registerMcpRoutes,
  mapProduct,
  mapFilters,
  buildAggregations,
  stripHtml,
}
