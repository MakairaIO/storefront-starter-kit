import React, { useContext, useEffect } from 'react'
import { setCookie } from 'nookies'
import { GlobalDataContext, Matomo } from '../..'

const AbTestingContext = React.createContext()

function AbTestingProvider({ children }) {
  const globalData = useContext(GlobalDataContext)

  const initAbTesting = () => {
    const experiments = getExperiments()

    Matomo.init()
    Matomo.enterAbTest({ experiments })

    setAbTestCookie({ experiments })
  }

  const getExperiments = () => {
    return (
      globalData?.pageData?.experiments ??
      globalData?.searchResult?.experiments ??
      []
    )
  }

  const setAbTestCookie = ({ experiments = [] }) => {
    if (experiments.length === 0) return

    const in180days = new Date()
    in180days.setSeconds(in180days.getSeconds() + 15552000)

    setCookie({}, 'mak_experiments', JSON.stringify(experiments), {
      expires: in180days,
      path: '/',
    })
  }

  // Utility for frontend experiments
  const isInExperiment = ({ id, variation }) => {
    const experiments = getExperiments()

    if (!experiments) return false

    const isParticipantOfExperiment = experiments.find(
      (e) => e.experiment == id
    )

    if (!isParticipantOfExperiment) return false

    return isParticipantOfExperiment['variation'] == variation
  }

  useEffect(() => {
    initAbTesting()
  }, []) // Only run once on mount

  const value = { isInExperiment }

  return (
    <AbTestingContext.Provider value={value}>
      {children}
    </AbTestingContext.Provider>
  )
}

function useAbTesting() {
  return useContext(AbTestingContext)
}

AbTestingProvider.contextType = GlobalDataContext

export { AbTestingProvider, useAbTesting }
export default AbTestingContext
