import classNames from 'classnames'
import { Text } from '../..'

function Pill(props) {
  const { onClick, children, active = false } = props

  const classes = classNames('product-detail-information__pill', {
    ['product-detail-information__pill--active']: active,
  })

  return (
    <button type="button" className={classes} onClick={onClick}>
      <Text>{children}</Text>
    </button>
  )
}

export default function VariantSelection(props) {
  const { title, values = [], selected, setSelected } = props

  if (values.length === 1 || !selected) return null

  return (
    <div className="product-detail-information__variants">
      <Text weight="medium">{title}</Text>

      <div>
        {values.map((value) => (
          <Pill
            key={value}
            onClick={() => setSelected(value)}
            active={selected === value}
          >
            {value}
          </Pill>
        ))}
      </div>
    </div>
  )
}
