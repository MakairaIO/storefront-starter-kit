import React from 'react'

function FormTextArea(props) {
  const { onChange = () => {}, label, name, ...rest } = props
  return (
    <textarea
      className="form-field__component form-field__textarea"
      {...rest}
      id={name}
      name={name}
      onChange={onChange}
    />
  )
}

export default FormTextArea
