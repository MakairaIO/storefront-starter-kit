import classNames from 'classnames'
import { Text } from '../..'

function Heading(props) {
  const {
    size = 'cupid',
    weight = 'medium',
    className = '',
    element = 'h1',
  } = props

  const classes = classNames(className, 'heading')

  return (
    <Text size={size} weight={weight} element={element} className={classes}>
      {props.children}
    </Text>
  )
}

export default Heading
export { default as headingVariants } from './variants.js'
