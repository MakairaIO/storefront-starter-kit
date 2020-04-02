import { useState, useEffect } from 'react'

export default function SVGSprite() {
  const [svgData, setData] = useState('')

  async function fetchData() {
    try {
      const response = await fetch('/assets/svgs/icons.svg')

      if (response.status !== 200) {
        const { status, statusText } = response

        const error = new Error()
        error.code = status
        error.message = statusText
        error.cause = 'Could not fetch sprite'
        error.stack = '<SVGSprite />'

        throw error
      }

      const sprite = await response.text()
      setData(sprite)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <div id="svg-wrapper" dangerouslySetInnerHTML={{ __html: svgData }} />
}
