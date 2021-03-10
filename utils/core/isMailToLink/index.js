export default function isMailToLink(href) {
  if (href.startsWith('mailto')) {
    return true
  } else {
    return false
  }
}
