export default function dispatchShowInformationEvent(detail) {
  const event = new CustomEvent('showInformation:info', {
    detail: detail,
  })

  window.dispatchEvent(event)
}
