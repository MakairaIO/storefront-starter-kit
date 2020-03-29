import { sortOptions } from '../..'

export default function prepareSortingForQuerySring(formData) {
  const optionId = formData.get('sorting')

  if (optionId === 'custom') return {}

  const selectedSorting = sortOptions.find(
    (option) => option.value === optionId
  )
  const { sortBy, order } = selectedSorting

  return { sortBy, order }
}
