import get from 'lodash/get'
import Slot from './Slot'
import BundleActions from './BundleActions'
import { useTranslation } from '../../../utils'

function getErrorMessage({ errors, slots, t }) {
  const error = get(errors, 'errors[0]')

  if (!error) return null

  const slot = slots.find((slot) => slot.id === error.slot_id) || {}
  return t(error.code)(slot.product.title)
}

function BundleSelection(props) {
  const { t } = useTranslation()
  const { config = {}, errors = {} } = props
  const { slots = [], isComplete } = config
  const error = getErrorMessage({ errors, slots, t })

  if (slots.length === 0) {
    return null
  }

  return (
    <>
      <div className="bundle-list__wrapper">
        {slots.map((slot) => (
          <Slot key={slot.id} slot={slot} {...props} />
        ))}

        {isComplete && <BundleActions />}
      </div>

      {error && <div className="bundle-list__error">{error}</div>}
    </>
  )
}

export default BundleSelection
export { default as bundleSelectionVariants } from './variants'
