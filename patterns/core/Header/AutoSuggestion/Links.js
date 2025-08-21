import { useTranslation } from '../../../../utils'
import LinkComponent from './LinkComponent'

function Links(props) {
  const { category = {}, links = {}, manufacturer = {} } = props
  const { t } = useTranslation()

  const linksLabel =
    links.count > 1 ? t('FILTER_LABEL_LINKS') : t('FILTER_LABEL_LINK')
  const categoryLabel =
    links.count > 1 ? t('FILTER_LABEL_CATEGORIES') : t('FILTER_LABEL_CATEGORY')
  const manufacturerLabel =
    links.count > 1
      ? t('FILTER_LABEL_MANUFACTURERS')
      : t('FILTER_LABEL_MANUFACTURER')

  return (
    <>
      <LinkComponent
        {...category}
        label={categoryLabel}
        titleProp="category_title"
      />
      <LinkComponent {...links} label={linksLabel} titleProp="title" />
      <LinkComponent
        {...manufacturer}
        label={manufacturerLabel}
        titleProp="manufacturer_title"
      />
    </>
  )
}

export default Links
