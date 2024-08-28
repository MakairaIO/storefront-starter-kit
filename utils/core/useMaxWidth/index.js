import { useState, useEffect } from 'react'

export default function useMaxWidth(width) {
  const [isMax, setIsMax] = useState(undefined)

  useEffect(() => {
    const detectSize = () => {
      if (window.innerWidth <= width) {
        setIsMax(true)
      } else {
        setIsMax(false)
      }
    }

    detectSize()

    window.addEventListener('resize', () => detectSize())
  }, [width])

  return isMax
}
