import React from 'react'

function FormInput(props) {
  const { onChange = () => {}, name, ...rest } = props
  return (
    <input
      className="form-field__component form-field__input"
      {...rest}
      id={name}
      name={name}
      onChange={onChange}
    />
  )
}

export default FormInput
