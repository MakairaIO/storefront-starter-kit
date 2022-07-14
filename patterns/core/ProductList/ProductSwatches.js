import classNames from 'classnames'

function Swatch(props) {
  const { variant = {}, activeVariant = {}, setActiveVariant } = props

  const { attributeStr = [] } = variant
  const color = attributeStr.find((attr) => attr.id === 'color')?.['value']

  if (!color) return null

  const classes = classNames(
    'product-item__swatch',
    `product-item__swatch--${color.toLowerCase().replace(' ', '-')}`,
    {
      ['product-item__swatch--active']: variant.id === activeVariant.id,
    }
  )

  return (
    <button
      type="button"
      className={classes}
      title={color}
      onClick={() => setActiveVariant(variant)}
    >
      <span>{color}</span>
    </button>
  )
}

export default function ProductSwatches(props) {
  const {
    'makaira-product': variants = [],
    activeVariant,
    setActiveVariant,
  } = props

  /**
   * We have to perform an additional check on the variant structure for backwards compatability.
   * Some users might receive a single variant but in that case it's not an array of length 1 but
   * instead a plain object. In these cases, the swatches are not relevant.
   */
  if (!Array.isArray(variants) || variants.length === 1) return null

  return (
    <div className="product-item__swatches">
      {variants.map((variant) => (
        <Swatch
          key={variant.id}
          variant={variant}
          activeVariant={activeVariant}
          setActiveVariant={setActiveVariant}
        />
      ))}
    </div>
  )
}
