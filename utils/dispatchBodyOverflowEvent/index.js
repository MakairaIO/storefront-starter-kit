export default function dispatchBodyOverflowEvent() {
  const showOverlayEvent = new Event('body:overflow')

  window.dispatchEvent(showOverlayEvent)
}
