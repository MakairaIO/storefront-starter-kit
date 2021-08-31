import get from 'lodash/get'
import Slot from './Slot'
import BundleActions from './BundleActions'
import { useTranslation } from '../../../utils'

function findProductPackage({ bundleId, bundleSnippet = [] }) {
  const result = bundleSnippet.filter((bundle) => {
    return get(bundle, 'properties.content.bundleId') == bundleId
  })
  return get(result, '0.properties.content')
}

function addPackageToSlot({ slots = [], productPackage = {} }) {
  const _slots = [...slots]

  _slots.splice(productPackage.position, 0, {
    id: 'binding-slot',
    content: productPackage.slot,
  })

  return _slots
}

function getErrorMessage({ errors, slots, t }) {
  const error = get(errors, 'errors[0]')

  if (!error) return null

  const slot = slots.find((slot) => slot.id === error.slot_id) || {}
  return t(error.code)(slot.product.title)
}

export default function BundleSelection(props) {
  const { t } = useTranslation()
  const { config, bundleId, bundleSnippet, errors = {} } = props
  const { slots = [], isComplete } = config
  const productPackage = findProductPackage({ bundleId, bundleSnippet })
  const error = getErrorMessage({ errors, slots, t })

  let slotsList = slots

  if (slots.length === 0) {
    return null
  }

  if (productPackage) {
    slotsList = addPackageToSlot({ slots, productPackage })
  }

  return (
    <>
      <div className="bundle-list__wrapper">
        {slotsList.map((slot) => (
          <Slot key={slot.id} slot={slot} {...props} />
        ))}

        {isComplete && <BundleActions />}
      </div>

      {error && <div className="bundle-list__error">{error}</div>}
    </>
  )
}
