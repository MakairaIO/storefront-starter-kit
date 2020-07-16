export default function Ribbon(props) {
  const { children = 'highlight' } = props

  return (
    <div className="ribbon">
      <span>{children} </span>
    </div>
  )
}
