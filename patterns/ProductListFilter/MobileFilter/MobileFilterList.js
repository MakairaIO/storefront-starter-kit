import MultiSelectFilter from './MultiSelectFilter'

const filterComponents = {
  list_multiselect: MultiSelectFilter,
}

export default function MobileFilterList(props) {
  const { isVisible = false, id, type, closeFilter } = props

  if (!isVisible) return null

  const Component = filterComponents[type]

  if (!Component) return null

  return (
    <div className="mobile-filter__list">
      <div className="mobile-filter__list-header">
        <span>{id}</span>

        <button type="button" onClick={closeFilter}>
          close
        </button>
      </div>

      <div className="mobile-filter__list-values">
        <Component {...props} />
      </div>

      <div className="mobile-filter__list-footer">
        <button type="button" onClick={closeFilter}>
          save
        </button>
      </div>
    </div>
  )
}
