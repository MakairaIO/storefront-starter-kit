import { isUrlMatchRules } from './isUrlMatchRules'

const CTA_TYPE = Object.freeze({
  SLIDEIN: 'slidein',
  POPUP: 'popup',
})

const reduceLatest = (prev, curr) => {
  if (!prev) return curr
  const a = new Date(prev.updatedAt)
  const b = new Date(curr.updatedAt)
  if (a.getTime() - b.getTime() >= 0) return prev
  else return curr
}

function filterLatestUpdateDocument(scenarioDocuments = [], documents = []) {
  const mapping = documents
    .map((id) => {
      const document = scenarioDocuments.find((item) => item.id === id)
      if (document) {
        const [ctaType] = document.ctaType.split('_')
        // console.log("filterLatestUpdateDocument", document.ctaType, ctaType)
        return {
          id,
          updatedAt: document.updatedAt,
          ctaType,
        }
      }
      return null
    })
    .filter((item) => !!item)

  const slideIn = mapping
    .filter((item) => item.ctaType === CTA_TYPE.SLIDEIN)
    .reduce(reduceLatest, null)
  const popup = mapping
    .filter((item) => item.ctaType === CTA_TYPE.POPUP)
    .reduce(reduceLatest, null)
  const result = []
  if (slideIn) result.push(slideIn)
  if (popup) result.push(popup)
  return result
}

export default function getUserIntentSettings(documents = []) {
  const initData = {
    pageScroll: [],
    pageExit: [],
    pageInactivity: [],
    pageElapsed: [],
  }

  for (let document of documents) {
    const { settings = {}, id, active } = document
    const exclude = document?.urlRule?.exclude || []
    const or = document?.urlRule?.or || []

    if (!active) continue

    const isMatchedExcludeRule = isUrlMatchRules(exclude)
    if (!isMatchedExcludeRule) {
      // console.log("MATCHING URL RULE", document, or)
      if (isUrlMatchRules(or)) {
        // console.log("MATCHED URL RULE", document, or)
        for (let settingKey in settings) {
          const updating = initData[settingKey]
          switch (settingKey) {
            case 'pageExit':
              if (settings[settingKey]) updating.push(id)
              break
            case 'pageScroll':
            case 'pageElapsed':
            case 'pageInactivity':
              {
                const index = updating.findIndex(
                  (item) => item.value === settings[settingKey]
                )
                if (index > -1) {
                  updating[index].documents.push(id)
                } else {
                  updating.push({
                    value: settings[settingKey],
                    documents: [id],
                  })
                }
              }
              break
            default:
              break
          }
        }
      }
    }
  }
  // console.log("BEFORE FILTER", JSON.parse(JSON.stringify(initData)))

  for (let key of Object.keys(initData)) {
    switch (key) {
      case 'pageExit':
        initData[key] = filterLatestUpdateDocument(documents, initData[key])
        break
      case 'pageScroll':
      case 'pageElapsed':
      case 'pageInactivity':
        {
          for (let item of initData[key]) {
            item.documents = filterLatestUpdateDocument(
              documents,
              item.documents
            )
          }
        }
        break
      default:
        break
    }
  }

  return initData
}