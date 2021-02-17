import cloneDeep from 'lodash/cloneDeep'

const INTERNAL_FIELDS = [
  'suggestion',
  'banners',
  'snippets',
  'searchredirect',
  'experiments',
]

/**
 * Not every field in our api response to a search request is relevant.
 * Therefore we want to filter fields that are used for other purposes.
 */
export default function filterInternalMakairaFields(apiResponse) {
  let clone = cloneDeep(apiResponse)

  INTERNAL_FIELDS.forEach((field) => delete clone[field])

  return clone
}
