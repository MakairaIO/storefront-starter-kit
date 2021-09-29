export default function Ribbon(props) {
  const { isVisible = false, children = 'highlight' } = props

  if (!isVisible) return null

  return (
    <div className="ribbon">
      <span>{children} </span>
    </div>
  )
}
