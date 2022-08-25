import { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Button } from '../..'

class Dropdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isExpanded: false,
      selected: props.value ?? props.options[0]?.value,
    }
  }

  componentDidMount() {
    window.addEventListener('click', this.hideWhenClickOutside)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.hideWhenClickOutside)
  }

  toggleExpanded = () => {
    this.setState((prevState) => {
      return {
        isExpanded: !prevState.isExpanded,
      }
    })
  }

  hideWhenClickOutside = (event) => {
    const { id } = this.props

    if (!event.target.closest(`#${id}`)) {
      this.setState({ isExpanded: false })
    }
  }

  handleChange = ({ index, value }) => {
    this.setState({ selected: value }, () =>
      this.props.onChange({ index, value })
    )
  }

  render() {
    const {
      id = '',
      name = '',
      label = '',
      options = [],
      anchor = 'left',
      className,
    } = this.props

    if (options.length == 0) return null

    const { isExpanded, selected } = this.state

    const dropdownClasses = classNames(className, 'dropdown', {
      ['dropdown--with-label']: label != '',
    })

    const listboxClasses = classNames('dropdown__listbox', {
      ['dropdown__listbox--visible']: isExpanded,
      ['dropdown__listbox--with-label']: label != '',
      [`dropdown__listbox--anchor-${anchor}`]: isExpanded,
    })

    const selectedOption = options.find((o) => o.value == selected) ?? ''

    return (
      <div className={dropdownClasses}>
        <Button
          id={id}
          aria-haspopup="listbox"
          aria-expanded={isExpanded}
          icon="chevron-down"
          onClick={this.toggleExpanded}
        >
          {label && <span>{label}</span>}

          <span>{selectedOption.label}</span>
        </Button>

        <ul role="listbox" aria-labelledby={id} className={listboxClasses}>
          {options.map((option, index) => {
            const { label, value } = option

            const optionClasses = classNames('dropdown__option', {
              ['dropdown__option--selected']: value == selected,
            })

            return (
              <li
                key={option.value}
                className={optionClasses}
                onClick={() => this.handleChange({ index, value })}
              >
                {label}
              </li>
            )
          })}
        </ul>

        {name && <input type="hidden" name={name} value={selected} />}
      </div>
    )
  }
}

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  anchor: PropTypes.oneOf(['left', 'right']),
  onChange: PropTypes.func.isRequired,
}

export default Dropdown
export { default as dropdownVariants } from './variants.js'
