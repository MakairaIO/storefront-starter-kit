export default function isOnPageAnchorLink(href = '') {
  if (href.startsWith('#')) {
    return true
  } else {
    return false
  }
}
