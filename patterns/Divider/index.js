function Divider(props) {
  const { position, id } = props
  const positionClass = position ? `divider--${position}` : 'divider--left'
  return (
    <div id={id} key={id} className={`divider ${positionClass}`}>
      <img src="/assets/images/divider/divider_x2.png" />
    </div>
  )
}

export default Divider
export { default as dividerVariants } from './variants.js'
