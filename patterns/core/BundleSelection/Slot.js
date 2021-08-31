import cs from 'classnames'
import { useConfiguration, useTranslation } from '../../../utils'
import { Icon, Link } from '../..'

function Image(props) {
  const { getImageLink } = useConfiguration()
  const picture_url_main = props.slot?.product?.picture_url_main || ''
  const contentImage = props.slot?.content?.image || ''

  const imgUrl = picture_url_main
    ? picture_url_main
    : contentImage
    ? getImageLink({ source: contentImage })
    : '/assets/images/bundleImage/placeholder.png'

  return (
    <div className="bundle-item__image">
      <img src={imgUrl} alt="" />
    </div>
  )
}

function Title(props) {
  const detailUrl = props.slot?.product?.selfLinks || {}
  const title = props.slot?.product?.title || props.slot?.content?.title

  return detailUrl && detailUrl[props.language] ? (
    <Link className="bundle-item__name" href={detailUrl[props.language]}>
      {title}
    </Link>
  ) : (
    <div className="bundle-item__name">{title}</div>
  )
}

export default function Slot(props) {
  const { t } = useTranslation()
  const { slot, editSlot, deleteSlot, currentSlot, errors = {} } = props
  const hasError =
    errors.errors && errors.errors.find((err) => err.slot_id === slot.id)

  const classes = cs('bundle-item', {
    'bundle-item__active': currentSlot === slot.id,
    'bundle-item__error': hasError,
  })

  return (
    <div className={classes}>
      <Image {...props} />

      <div className="bundle-item__info">
        <Title {...props} />

        <div>
          {slot.content?.button_text && (
            <div
              className="bundle-item__button"
              onClick={() => editSlot(slot.id)}
            >
              <Icon symbol="chevron-right" />
              {slot.content.button_text}
            </div>
          )}

          {slot.product && (
            <div
              className="bundle-item__button"
              onClick={() => deleteSlot(slot.id)}
            >
              <Icon symbol="chevron-right" />
              {t('DELETE_SLOT')}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
