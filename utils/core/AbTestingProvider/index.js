import React, { Component, useContext } from 'react'
import { setCookie } from 'nookies'
import { GlobalDataContext, Matomo } from '../..'

/* First we will make a new context */
const AbTestingContext = React.createContext()

/* Then create a provider Component */
class AbTestingProvider extends Component {
  componentDidMount() {
    this.initAbTesting()
  }

  initAbTesting = () => {
    const experiments = this.getExperiments()

    Matomo.init()
    Matomo.enterAbTest({ experiments })

    this.setAbTestCookie({ experiments })
  }

  getExperiments = () => {
    return (
      this.context.pageData?.experiments ??
      this.context.searchResult?.experiments ??
      []
    )
  }

  setAbTestCookie = ({ experiments = [] }) => {
    if (experiments.length == 0) return

    let in180days = new Date()
    in180days.setSeconds(15552000)

    setCookie({}, 'mak_experiments', JSON.stringify(experiments), {
      expires: in180days,
      path: '/',
    })
  }

  // Utility for frontend experiments
  isInExperiment = ({ id, variation }) => {
    const experiments = this.getExperiments()

    if (!experiments) return false

    const isParticipantOfExperiment = experiments.find(
      (e) => e.experiment == id
    )

    if (!isParticipantOfExperiment) return false

    return isParticipantOfExperiment['variation'] == variation
  }

  render() {
    return (
      <AbTestingContext.Provider
        value={{ isInExperiment: this.isInExperiment }}
      >
        {this.props.children}
      </AbTestingContext.Provider>
    )
  }
}

function useAbTesting() {
  return useContext(AbTestingContext)
}

AbTestingProvider.contextType = GlobalDataContext

export default AbTestingContext
export { AbTestingProvider, useAbTesting }
