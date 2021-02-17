import { parseCookies, setCookie } from 'nookies'

export default {
  setAbTestCookie({ experiments = [] }) {
    if (experiments.length == 0) return

    let in180days = new Date()
    in180days.setSeconds(15552000)

    setCookie({}, 'mak_experiments', JSON.stringify(experiments), {
      expires: in180days,
      path: '/',
    })
  },

  // Utility for frontend experiments
  isInExperiment({ id, variation }) {
    const { mak_experiments = '' } = parseCookies()

    if (!mak_experiments) return false

    const experiments = JSON.parse(mak_experiments)

    const isParticipantOfExperiment = experiments.find(
      (e) => e.experiment == id
    )

    if (!isParticipantOfExperiment) return false

    return isParticipantOfExperiment['variation'] == variation
  },
}
