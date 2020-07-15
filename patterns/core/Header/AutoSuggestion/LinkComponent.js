import { Heading, Link, Text } from '../../..'

function LinkComponent(props) {
  const { count = 0, items = [], label = '', titleProp = '' } = props

  if (count <= 0) {
    return null
  }

  return (
    <section className="autosuggest-box__link-box">
      <Heading size="bacchus" element="h2">
        {label}
      </Heading>

      <ul className="autosuggest__links">
        {items.map((item) => (
          <li key={item.id} className="autosuggest__link-item">
            <Link href={item.fields.url} className="autosuggest__link">
              <Text size="aphrodite" weight="400" className="">
                {item.fields[titleProp]}
              </Text>
            </Link>
          </li>
        ))}
      </ul>
      <hr></hr>
    </section>
  )
}

export default LinkComponent
