/**
 * returns true or false depending on wether the question should be skipped or not
 */

const booleanOperators = Object.freeze({
  isTrue: '!!',
  isFalse: '!',
})

const mathOperators = Object.freeze({
  eq: '===',
  gt: '>',
  lt: '<',
  gte: '>=',
  lte: '<=',
})

const stringOperators = Object.freeze({
  inList: '===',
  notInList: '!==',
})

const mathFieldTypes = ['double', 'long', 'integer', 'byte', 'float']

/**
 * Checks wether the question that should be answered right now can even be answered
 * @param {MakairaProduct[]} items
 * @param {ProductFinderQuestion[]} questions
 * @param {ProductFinderAnswer[]} answers
 * @returns {boolean}
 */
export function shouldSkipQuestion(
  items = [],
  questions = [],
  answers = [],
  language = 'de'
) {
  if (!answers || !Array.isArray(answers) || !answers.length) {
    return false
  }

  const questionToCheck = questions[answers.length]
  // check each item to see if the values of the question match the item. if any of the values can still be selected, the question should not be skipped
  const shouldSkip = items.some((item) => {
    const field = questionToCheck.field.id
    const fieldType = questionToCheck.field.type

    let value = item[field]
    if (field.startsWith('attribute') && field.includes('::')) {
      const [attrGroup, id] = field.split('::')
      value = item[attrGroup]?.find((attribute) => attribute.id === id).value
    }

    if (!value) {
      return false
    }

    if (mathFieldTypes.includes(fieldType)) {
      if ('rangeNumberOptions' in questionToCheck) {
        return doMathRangeComparison(value, questionToCheck.rangeNumberOptions)
      }

      return questionToCheck.textOptions[language].some((option) => {
        return doMathComparison(value, option.value, option.operator)
      })
    }

    if (fieldType === 'boolean') {
      // either !value or !!value
      return questionToCheck.textOptions[language].some((option) => {
        return eval(`${booleanOperators[option.operator]}${value}`)
      })
    }

    // The available comparisons are "like", "notLike", "inList", notInList"
    // I don't know how we can implement the likenesses, so I'm leaving them out

    if (Array.isArray(item[field])) {
      return questionToCheck.textOptions[language].some((option) => {
        doStringInListComparison(
          item[field],
          value,
          option.operator === 'inList'
        )
      })
    } else {
      return questionToCheck.textOptions[language].some((option) => {
        return eval(
          `${option.value} ${stringOperators[option.operator]} ${value}`
        )
      })
    }
  })

  return shouldSkip
}

function doMathComparison(value, compareWith, operator) {
  return eval(
    `${parseFloat(value)} ${mathOperators[operator]} ${parseFloat(compareWith)}`
  )
}

function doMathRangeComparison(value, range) {
  return (
    parseFloat(value) >= parseFloat(range.min) &&
    parseFloat(value) <= parseFloat(range.max)
  )
}

function doStringInListComparison(value, compareWith, shouldBeInList) {
  const isInList = value.includes(compareWith)

  return shouldBeInList ? isInList : !isInList
}
