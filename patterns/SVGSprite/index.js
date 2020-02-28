import { useState, useEffect } from 'react'
import { logError } from '../../utils'

export default function SVGSprite() {
  const [svgData, setData] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/assets/svgs/icons.svg')
        const sprite = await response.text()

        setData(sprite)
      } catch (error) {
        logError(error)
      }
    }

    fetchData()
  }, [])

  return <div id="svg-wrapper" dangerouslySetInnerHTML={{ __html: svgData }} />
}
