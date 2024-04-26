import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Button } from '../..'

type Option = {
  label: string
  value: string | number
}

type DropdownProps = {
  id: string
  name?: string
  label?: string
  value?: string | number
  options: Option[]
  anchor?: 'left' | 'right'
  className?: string
  onChange: (value: { index: number; value: string | number }) => void
}

const Dropdown: React.FC<DropdownProps> = ({
  id = '',
  name = '',
  label = '',
  value,
  options = [],
  anchor = 'left',
  className,
  onChange,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [selected, setSelected] = useState<string | number>(
    value ?? options[0]?.value
  )

  useEffect(() => {
    const hideWhenClickOutside = (event: MouseEvent) => {
      if (!event.target || !(event.target instanceof Element)) return
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

  const handleChange = ({
    index,
    value,
  }: {
    index: number
    value: string | number
  }) => {
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

  const selectedOption = options.find((o) => o.value === selected) || {
    label: '',
  }

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

export default Dropdown
export { default as dropdownVariants } from './variants.js'
