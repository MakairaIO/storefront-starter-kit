import React, { createContext, ReactNode, useContext, useEffect } from 'react'
import { setCookie } from 'nookies'
import { GlobalDataContext, Matomo } from '../..'

type Experiment = {
  experiment: string
  variation: string
}

type AbTestingContextType = {
  isInExperiment: ({
    id,
    variation,
  }: {
    id: string
    variation: string
  }) => boolean
}
const AbTestingContext = createContext<AbTestingContextType | undefined>(
  undefined
)

type AbTestingProviderProps = {
  children: ReactNode
}

function AbTestingProvider({ children }: AbTestingProviderProps) {
  const globalData = useContext(GlobalDataContext)

  const initAbTesting = () => {
    const experiments = getExperiments()

    Matomo.init()
    Matomo.enterAbTest({ experiments })

    setAbTestCookie({ experiments })
  }

  const getExperiments = (): Experiment[] => {
    return (
      globalData?.pageData?.experiments ??
      globalData?.searchResult?.experiments ??
      []
    )
  }

  const setAbTestCookie = ({
    experiments = [],
  }: {
    experiments?: Experiment[]
  }) => {
    if (experiments.length === 0) return

    const in180days = new Date()
    in180days.setSeconds(in180days.getSeconds() + 15552000)

    setCookie({}, 'mak_experiments', JSON.stringify(experiments), {
      expires: in180days,
      path: '/',
    })
  }

  // Utility for frontend experiments
  const isInExperiment = ({
    id,
    variation,
  }: {
    id: string
    variation: string
  }): boolean => {
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

  const value: AbTestingContextType = { isInExperiment }

  return (
    <AbTestingContext.Provider value={value}>
      {children}
    </AbTestingContext.Provider>
  )
}

function useAbTesting() {
  return useContext(AbTestingContext)
}

export { AbTestingProvider, useAbTesting }
export default AbTestingContext
