import classNames from 'classnames'
import { Icon, Button } from '../../..'
import { useState, useRef } from 'react'

export default function MultiSelectFilter(props) {
  const {
    id,
    values: filterValues,
    selectedValues,
    submitForms,
    className,
  } = props

  const innerRef = useRef(null)
  const wrapperRef = useRef(null)
  const listItems = Object.values(filterValues)
  const [open, setOpen] = useState(false)
  const [height, setHeight] = useState(203)

  const toggleText = open ? 'Weniger anzeigen' : 'Mehr anzeigen'
  const wrapperClasses = classNames(
    className,
    'desktop-filter__multi-select__wrapper',
    {
      ['desktop-filter__multi-select__wrapper--overflow']:
        listItems.length > 6 && !open,
    }
  )
  const buttonClasses = classNames(
    className,
    'desktop-filter__multi-select-button',
    {
      ['desktop-filter__multi-select-button--visible']: listItems.length > 6,
    }
  )

  function toggleOpen() {
    const inner = innerRef.current.getBoundingClientRect()
    setHeight(!open ? inner.height : 203)

    open ? setOpen(false) : setOpen(true)
  }

  return (
    <>
      <div
        style={{ maxHeight: height }}
        ref={wrapperRef}
        className={wrapperClasses}
      >
        <ul ref={innerRef} className="desktop-filter__multi-select">
          {listItems.map((filter) => {
            const { key: filterValue } = filter

            let isActive = false

            if (Array.isArray(selectedValues)) {
              // lowercase values for normalization purposes
              isActive = selectedValues
                .map((val) => val.toLowerCase())
                .includes(filterValue.toLowerCase())
            }

            const itemClasses = classNames(
              'desktop-filter__multi-select-item--default',
              {
                ['desktop-filter__multi-select-item--active']: isActive,
              }
            )

            return (
              <li key={filterValue} className={itemClasses}>
                <label>
                  <Icon symbol={isActive ? 'check-circle' : 'circle'} />

                  {filterValue}

                  <input
                    type="checkbox"
                    name={id}
                    checked={isActive}
                    value={filterValue}
                    onChange={submitForms}
                  />
                </label>
              </li>
            )
          })}
        </ul>
      </div>
      <Button className={buttonClasses} onClick={toggleOpen}>
        {toggleText}
      </Button>
    </>
  )
}
