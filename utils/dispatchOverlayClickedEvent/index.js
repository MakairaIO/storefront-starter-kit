export default function dispatchOverlayClickedEvent() {
  const overlayClickedEvent = new Event('overlay:clicked')

  window.dispatchEvent(overlayClickedEvent)
}
