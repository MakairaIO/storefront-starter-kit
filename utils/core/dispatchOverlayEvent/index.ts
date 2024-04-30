export default function dispatchOverlayEvent(event: 'show' | 'hide') {
  const e = new Event(`overlay:${event}`)

  window.dispatchEvent(e)
}
