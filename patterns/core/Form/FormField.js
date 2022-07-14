import React from 'react'
import classnames from 'classnames'
import Text from '../Text'

export function FormField(props) {
  const {
    onChange,
    values = {},
    name,
    field = 'value',
    label,
    children,
    errors = {},
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
    'form-field': true,
    'form-field--required': rest.required,
  })

  const error = errors[name]

  return (
    <div className={formFieldClassName}>
      {label && (
        <label htmlFor={name} className="form-field__label">
          {label}
        </label>
      )}
      {childrenWithProps}
      {error && (
        <Text element="p" className="form-field__error">
          {error}
        </Text>
      )}
    </div>
  )
}

export default FormField
