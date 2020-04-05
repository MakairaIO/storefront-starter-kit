import { Button } from '../..'

export default function Image(props) {
  const { title = '', picture_url_main = '' } = props

  return (
    <div className="product-detail-information__image">
      <picture>
        <img src={picture_url_main} alt={title} />
      </picture>

      <Button
        icon="search"
        variant="icon-only"
        className="product-detail-information__image-button"
      />
    </div>
  )
}
