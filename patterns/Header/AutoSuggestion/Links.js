import LinkComponent from './LinkComponent'

function Links(props) {
  const { isVisible = false, ...otherResults } = props

  if (!isVisible) return null

  return (
    <section className="autosuggest-box__links">
      {Object.entries(otherResults).map(([type, data]) => (
        <LinkComponent key={type} type={type} {...data} />
      ))}
    </section>
  )
}

export default Links
