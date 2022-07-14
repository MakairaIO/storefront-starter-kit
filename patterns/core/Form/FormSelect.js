import React from 'react'

function FormSelect(props) {
  const { onChange = () => {}, name, options = [], ...rest } = props
  return (
    <select
      className="form-field__component form-field__select"
      {...rest}
      id={name}
      name={name}
      onChange={onChange}
    >
      {options.map((option, index) => {
        return (
          <option value={option.value} key={`select-${name}-option-${index}`}>
            {option.label}
          </option>
        )
      })}
    </select>
  )
}

export default FormSelect
