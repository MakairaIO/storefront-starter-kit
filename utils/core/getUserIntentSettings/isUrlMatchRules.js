function operatorComparision(operator, sourceValue, compareValue = '') {
  try {
    switch (operator) {
      case 'is':
        if (sourceValue === compareValue) return true
        break
      case 'contains':
        if (sourceValue.includes(compareValue)) return true
        break
      case 'begins':
        if (sourceValue.startsWith(compareValue)) return true
        break
      case 'wildcard':
        {
          const regex = new RegExp(`^${compareValue.replace('*', '.*')}`, 'g')
          if (sourceValue.match(regex)) return true
        }
        break
      default:
        break
    }
  } catch (error) {
    console.debug(error)
  }
  return false
}

function stripTrailingSlash(str) {
  return str.replace(/\/$/, '')
}

export function isUrlMatchRules(rules) {
  const url = stripTrailingSlash(window.location.pathname)
  const searchStr = window.location.search.replace('?', '')
  const query = Object.fromEntries(new URLSearchParams(searchStr).entries())
  for (let rule of rules) {
    let isMatched = false
    if (rule.key === 'url') {
      isMatched = operatorComparision(
        rule.operator,
        url,
        stripTrailingSlash(rule.value)
      )
    }
    if (rule.key === 'query') {
      const queryValue = rule.queryName && query[rule.queryName]
      isMatched =
        queryValue !== undefined
          ? operatorComparision(rule.operator, queryValue, rule.value)
          : false
    }

    if (isMatched) return true
  }
  return false
}
