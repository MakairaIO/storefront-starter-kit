import classNames from 'classnames'
import { Text } from '../..'

function Copytext(props) {
  const {
    size = 'aphrodite',
    weight = 'regular',
    className = '',
    element = 'p',
    dangerouslySetInnerHTML = '',
  } = props
  const classes = classNames(className, 'copytext')

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
      />
    )
  }

  return (
    <Text element={element} size={size} weight={weight} className={classes}>
      {props.children}
    </Text>
  )
}

export default Copytext
export { default as copytextVariants } from './variants.js'
