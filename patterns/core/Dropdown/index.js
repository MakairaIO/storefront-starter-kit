import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Button } from '../..'

const Dropdown = (props) => {
  const {
    id = '',
    name = '',
    label = '',
    value,
    options = [],
    anchor = 'left',
    className,
    onChange,
  } = props

  const [isExpanded, setIsExpanded] = useState(false)
  const [selected, setSelected] = useState(value ?? options[0]?.value)

  useEffect(() => {
    const hideWhenClickOutside = (event) => {
      if (!event.target.closest(`#${id}`)) {
        setIsExpanded(false)
      }
    }

    window.addEventListener('click', hideWhenClickOutside)

    return () => {
      window.removeEventListener('click', hideWhenClickOutside)
    }
  }, [id])

  const toggleExpanded = () => {
    setIsExpanded((prevExpanded) => !prevExpanded)
  }

  const handleChange = ({ index, value }) => {
    setSelected(value)
    onChange({ index, value })
  }

  if (options.length === 0) return null

  const dropdownClasses = classNames(className, 'dropdown', {
    ['dropdown--with-label']: label !== '',
  })

  const listboxClasses = classNames('dropdown__listbox', {
    ['dropdown__listbox--visible']: isExpanded,
    ['dropdown__listbox--with-label']: label !== '',
    [`dropdown__listbox--anchor-${anchor}`]: isExpanded,
  })

  const selectedOption = options.find((o) => o.value === selected) || ''

  return (
    <div className={dropdownClasses}>
      <Button
        id={id}
        aria-haspopup="listbox"
        aria-expanded={isExpanded}
        icon="chevron-down"
        onClick={toggleExpanded}
      >
        {label && <span>{label}</span>}
        <span>{selectedOption.label}</span>
      </Button>

      <ul role="listbox" aria-labelledby={id} className={listboxClasses}>
        {options.map((option, index) => {
          const { label, value } = option

          const optionClasses = classNames('dropdown__option', {
            ['dropdown__option--selected']: value === selected,
          })

          return (
            <li
              key={value}
              className={optionClasses}
              onClick={() => handleChange({ index, value })}
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
