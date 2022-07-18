import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { iframeResizer as iframeResizerLib } from 'iframe-resizer/js'

const IFRAME_RESIZER_CDN =
  'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.min.js'

const IframeResizerWrapper = ({ children, iframeResizerOptions }) => {
  const [iframeRef, setIframeRef] = useState(null)
  const [finished, setFinished] = useState(false)

  const mountNode = iframeRef?.contentWindow?.document?.body

  useEffect(() => {
    return () => {
      iframeRef?.iFrameResizer?.removeListeners()
    }
  }, [iframeRef])

  const resizeIframe = () => {
    const frame = iframeRef

    if (!frame || finished) return

    iframeResizerLib(iframeResizerOptions, frame)
  }

  const injectIframeResizerUrl = () => {
    const frame = iframeRef
    const doc = frame?.contentDocument
    if (finished || !frame || !doc) return

    let injectTarget = null
    const possibleTags = ['head', 'HEAD', 'body', 'BODY', 'div', 'DIV']
    possibleTags.forEach((tagName) => {
      if (injectTarget) return
      const found = doc.getElementsByTagName(tagName)
      if (!(found && found.length)) return
      injectTarget = found[0]
    })

    if (!injectTarget) {
      console.error('Unable to inject iframe resizer script')
      return
    }

    const resizerScriptElement = document.createElement('script')
    resizerScriptElement.type = 'text/javascript'
    resizerScriptElement.src = IFRAME_RESIZER_CDN
    injectTarget.appendChild(resizerScriptElement)

    setFinished(true)
  }

  const onLoad = () => {
    resizeIframe()
    injectIframeResizerUrl()
  }

  return (
    <iframe
      style={{
        width: '100%',
        minHeight: 20,
      }}
      ref={setIframeRef}
      onLoad={onLoad}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  )
}

export default IframeResizerWrapper
