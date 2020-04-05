import { Dropdown } from '../..'
import { sortOptions, useTranslation } from '../../../utils'

export default function Sorter(props) {
  const { t } = useTranslation()
  const { queryParams = {}, submitForms } = props
  const sortBy = queryParams.sortBy ?? sortOptions[0].sortBy
  const order = queryParams.order ?? sortOptions[0].order

  const dropdownOptions = sortOptions.map((o) => {
    return {
      ...o,
      label: t(o.label),
    }
  })

  const currentSorting = dropdownOptions.find(
    (option) => option.sortBy === sortBy && option.order === order
  )

  return (
    <form className="product-list__sorter">
      <Dropdown
        id="sorter"
        name="sorting"
        options={dropdownOptions}
        value={currentSorting.value}
        onChange={submitForms}
        anchor="right"
      />
    </form>
  )
}
