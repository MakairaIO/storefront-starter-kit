import classNames from 'classnames'
import { Text } from '..'

function Copytext(props) {
  const {
    size = 'charlie',
    weight = 'regular',
    className = '',
    element = 'p',
    dangerouslySetInnerHTML = '',
    variant,
    ...rest
  } = props
  const classes = classNames(className, 'copytext', {
    [`${variant}`]: !(variant === undefined || variant === null),
  })

  if (dangerouslySetInnerHTML) {
    /**
     * We default to a <div> here because we will most likely have
     * <p> tags in the html, which may cause invalid HTML if we make it possible
     * to use <p> tags as a container.
     */
    return (
      <Text
        element="div"
        size={size}
        weight={weight}
        className={classes}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        {...rest}
      />
    )
  }

  return (
    <Text
      element={element}
      size={size}
      weight={weight}
      className={classes}
      {...rest}
    >
      {props.children}
    </Text>
  )
}

export default Copytext
export { default as copytextVariants } from './variants.js'
