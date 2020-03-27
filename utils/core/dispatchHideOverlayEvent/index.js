export default function dispatchHideOverlayEvent() {
  const showOverlayEvent = new Event('overlay:hide')

  window.dispatchEvent(showOverlayEvent)
}
