import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'

const HubspotMeetingWidget = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src =
      'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js'
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <>
      <Helmet>
        <script
          type="text/javascript"
          src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
        ></script>
      </Helmet>
      <div
        className="meetings-iframe-container"
        data-src="https://meetings-eu1.hubspot.com/florian-brandt?embed=true"
      ></div>
    </>
  )
}

export default HubspotMeetingWidget
