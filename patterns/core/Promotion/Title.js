import { Heading } from '../..'

export default function Title(props) {
  const { text = '', pre = '' } = props

  return (
    <div className="promotion__title-wrapper">
      {pre && <span className="promotion__pre-title">{pre}</span>}

      <Heading size="110" element="span" className="promotion__title">
        {text}
      </Heading>
    </div>
  )
}
