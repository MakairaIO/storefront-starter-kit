export default function dispatchShowOverlayEvent() {
  const showOverlayEvent = new Event('overlay:show')

  window.dispatchEvent(showOverlayEvent)
}
