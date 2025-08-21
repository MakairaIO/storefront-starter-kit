import classNames from 'classnames'
import { Text } from '..'

function Heading(props) {
  const {
    size = 'echo',
    weight = 'regular',
    className = '',
    element = 'h2',
    level,
    variant,
    ...rest
  } = props

  const classes = classNames(className, 'heading', {
    [`level_${level}`]: !(level === undefined || level === null),
    [`${variant}`]: !(variant === undefined || variant === null),
  })

  const styles = {
    size,
    weight,
    element: level ? `h${level}` : element,
  }

  return (
    <Text {...styles} className={classes} {...rest}>
      {props.children}
    </Text>
  )
}

export default Heading
export { default as headingVariants } from './variants.js'
