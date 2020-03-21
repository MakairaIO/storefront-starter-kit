import { Component } from 'react'
import { Range } from 'rc-slider'

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

export default class RangeFilter extends Component {
  constructor(props) {
    super(props)

    const { min, max, selectedValues = {} } = props

    this.state = {
      selectedMin: Math.trunc(selectedValues?.from ?? min),
      selectedMax: Math.trunc(selectedValues?.to ?? max),
    }
  }

  handleChange = values => {
    const [selectedMin, selectedMax] = values

    this.setState({ selectedMin, selectedMax })
  }

  render() {
    const { id, min, max } = this.props
    const { selectedMin, selectedMax } = this.state

    // FIXME: Currently € is hard-coded -> Change to dynamic slider-labels
    return (
      <div className="desktop-filter__range-filter">
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

        <span className="desktop-filter__range-filter-label">
          {selectedMin} € - {selectedMax} €
        </span>

        <Range
          min={min}
          max={max}
          defaultValue={[selectedMin, selectedMax]}
          onChange={this.handleChange}
          handleStyle={styles.handleStyle}
          trackStyle={styles.trackStyle}
          railStyle={styles.railStyle}
        />
      </div>
    )
  }
}
