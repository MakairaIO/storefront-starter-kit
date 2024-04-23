import React, { useState, useEffect } from 'react'
import { logError } from '../../../utils'

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hasError, setHasError] = useState<boolean>(false)

  useEffect(() => {
    const handleErrors = (event: ErrorEvent) => {
      const { origin, pathname, search } = window.location
      const { platform, userAgent } = window.navigator

      const data = {
        Host: origin,
        Path: pathname,
        queryString: search,
        Platform: platform,
        'User-Agent': userAgent,
      }

      if (event.error != null) {
        const { message, stack } = event.error

        data['Location'] = 'ErrorBoundary'
        data['Error'] = message
        data['StackTrace'] = stack
      }

      logError(data)
      setHasError(true)
    }

    window.addEventListener('error', handleErrors)

    return () => {
      window.removeEventListener('error', handleErrors)
    }
  }, [])

  const isProdMode = process.env.NODE_ENV === 'production'

  if (hasError && isProdMode) {
    return null
  }

  if (hasError && !isProdMode) {
    return (
      <p style={{ textAlign: 'center' }}>
        Component failed to render. Please check error logs.
      </p>
    )
  }

  return <>{children}</>
}

export default ErrorBoundary
