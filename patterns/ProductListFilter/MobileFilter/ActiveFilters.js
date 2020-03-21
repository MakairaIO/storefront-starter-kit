export default function ActiveFilters(props) {
  const { selectedValues, min, max } = props

  if (selectedValues === null) return null

  if (Array.isArray(selectedValues)) {
    // Most common case: Simple strings as Array

    return (
      <span className="mobile-filter__active-filters">
        {selectedValues.join(', ')}
      </span>
    )
  } else {
    const from = selectedValues.from ?? min
    const to = selectedValues.to ?? max

    // FIXME: Currently € is hard-coded -> Change to dynamic slider-labels
    return (
      <span className="mobile-filter__active-filters">
        {from} € - {to} €
      </span>
    )
  }
}
