import Router from 'next/router'

/**
 * Only redirects to the catch-all route for now.
 */
export default function redirect({ ctx = {}, target = '/', code = 301 }) {
  const { res } = ctx

  if (res) {
    res.writeHead(code, { Location: target })
    res.end()
  } else {
    Router.push(`/frontend/entry?seoUrl=${target}`, target)
  }
}
