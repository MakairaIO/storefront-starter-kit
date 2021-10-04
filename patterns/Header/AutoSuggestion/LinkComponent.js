import { Heading, Link, Text } from '../..'
import { useTranslation } from '../../../utils'

function LinkComponent(props) {
  const { type = '', count = 0, items = [] } = props
  const { t } = useTranslation()

  if (count <= 0) {
    return null
  }

  const translationKey = 'FILTER_LABEL_' + type.toUpperCase()
  const heading = t(translationKey, type.toUpperCase())

  return (
    <section className="autosuggest-box__link-box">
      <Heading size="bacchus" element="h2">
        {heading}
      </Heading>

      <ul className="autosuggest__links">
        {items.map((item) => {
          const {
            id,
            url,
            title,
            category_title,
            manufacturer_title,
          } = item.fields
          const displayValue = title ?? category_title ?? manufacturer_title

          return (
            <li key={id} className="autosuggest__link-item">
              <Link href={url} className="autosuggest__link">
                <Text size="aphrodite" weight="400" className="">
                  {displayValue}
                </Text>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default LinkComponent
