import { Component } from 'react'
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

export default class RangeFilter extends Component {
  constructor(props) {
    super(props)

    const initialState = this.getStateFromProps()

    this.state = initialState
  }

  componentDidUpdate(prevProps) {
    // If props change from the outside (e.g. when resetting filters) we need to update
    // the state of the range slider accordingly
    if (!isEqual(prevProps.selectedValues, this.props.selectedValues)) {
      const updatedState = this.getStateFromProps()

      this.setState(updatedState)
    }
  }

  getStateFromProps = () => {
    const { min, max, selectedValues = {} } = this.props

    const selectedMin = Math.trunc(selectedValues?.from ?? min)
    const selectedMax = Math.trunc(selectedValues?.to ?? max)

    return { selectedMin, selectedMax }
  }

  handleChange = (values) => {
    const [selectedMin, selectedMax] = values

    this.setState({ selectedMin, selectedMax })
  }

  render() {
    const { id, min, max, submitForms } = this.props
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

        <Slider
          range
          min={Math.trunc(min)}
          max={Math.trunc(max)}
          value={[selectedMin, selectedMax]}
          onChange={this.handleChange}
          onAfterChange={submitForms}
          handleStyle={styles.handleStyle}
          trackStyle={styles.trackStyle}
          railStyle={styles.railStyle}
        />
      </div>
    )
  }
}
