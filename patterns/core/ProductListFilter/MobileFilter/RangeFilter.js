import { useState, useEffect } from 'react'
import Slider from 'rc-slider'
import isEqual from 'lodash/isEqual'

const handleStyle = {
  backgroundColor: 'var(--neutral-00)',
  borderColor: 'var(--neutral-40)',
  height: '2.4rem',
  width: '2.4rem',
  top: 0,
}

const styles = {
  handleStyle: [{ ...handleStyle }, { ...handleStyle }],
  trackStyle: [{ backgroundColor: 'var(--primary)' }],
  railStyle: {
    backgroundColor: 'var(--neutral-20)',
  },
}

export default function RangeFilter({ id, min, max, selectedValues = {} }) {
  const [selectedMin, setSelectedMin] = useState(
    Math.trunc(selectedValues?.from ?? min)
  )
  const [selectedMax, setSelectedMax] = useState(
    Math.trunc(selectedValues?.to ?? max)
  )

  useEffect(() => {
    const prevState = { selectedMin, selectedMax }
    const newState = getStateFromProps()
    if (!isEqual(prevState, newState)) {
      setSelectedMin(newState.selectedMin)
      setSelectedMax(newState.selectedMax)
    }
  }, [selectedValues])

  const getStateFromProps = () => {
    const selectedMin = Math.trunc(selectedValues?.from ?? min)
    const selectedMax = Math.trunc(selectedValues?.to ?? max)
    return { selectedMin, selectedMax }
  }

  const handleChange = (values) => {
    const [selectedMin, selectedMax] = values
    setSelectedMin(selectedMin)
    setSelectedMax(selectedMax)
  }

  // FIXME: Currently € is hard-coded -> Change to dynamic slider-labels
  return (
    <div className="mobile-filter__range-filter">
      <div>
        <input
          type="hidden"
          className="makaira-filter__input--min"
          name={`${id}_from`}
          value={selectedMin}
        />
        <input
          type="hidden"
          className="makaira-filter__input--max"
          name={`${id}_to`}
          value={selectedMax}
        />
      </div>

      <span className="mobile-filter__range-filter-label">
        {selectedMin} € - {selectedMax} €
      </span>

      <Slider
        range
        min={Math.trunc(min)}
        max={Math.trunc(max)}
        value={[selectedMin, selectedMax]}
        onChange={handleChange}
        handleStyle={styles.handleStyle}
        trackStyle={styles.trackStyle}
        railStyle={styles.railStyle}
      />
    </div>
  )
}
