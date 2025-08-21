import classNames from 'classnames'
import { Button } from '..'

function InputIcon({
  className,
  icon = 'caret-right-solid',
  name,
  placeholder = 'placeholder',
  onClickIcon = () => {},
  defaultValue = '',
  onChange = () => {},
  submitForm = () => {},
}) {
  const classes = classNames('input-icon', className)
  return (
    <form className={classes} onSubmit={submitForm}>
      <label>
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          className="input-icon__input"
          defaultValue={defaultValue}
          onChange={onChange}
        />

        <Button onClick={onClickIcon} icon={icon} variant="icon-only" />
      </label>
    </form>
  )
}

export default InputIcon
export { default as inputIconVariants } from './variants.js'
