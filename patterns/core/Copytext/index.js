import classNames from 'classnames'

function Copytext(props) {
  const {
    size = '150',
    className = '',
    element = 'p',
    dangerouslySetInnerHTML = '',
  } = props
  const classes = classNames(className, 'copytext', `copytext--${size}`)

  if (dangerouslySetInnerHTML) {
    /**
     * We default to a <div> here because we will most likely have
     * <p> tags in the html, which may cause invalid HTML if we make it possible
     * to use <p> tags as a container.
     */
    return (
      <div
        className={classes}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      />
    )
  }

  const Element = element

  return <Element className={classes}>{props.children}</Element>
}

export default Copytext
export { default as copytextVariants } from './variants.js'
