import React from 'react'
import classnames from 'classnames'

export function FormField(props) {
  const {
    onChange,
    values = {},
    name,
    field = 'value',
    label,
    children,
    ...rest
  } = props
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...rest,
        onChange,
        name,
        [field]: values[name],
      })
    }
    return child
  })
  const formFieldClassName = classnames({
    'contact-form__form-field': true,
    required: rest.required,
  })
  return (
    <div className={formFieldClassName}>
      {label && (
        <label htmlFor={name} className="form-field__label">
          {label}
        </label>
      )}
      {childrenWithProps}
    </div>
  )
}

export default FormField
