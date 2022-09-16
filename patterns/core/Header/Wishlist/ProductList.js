import { getProductDetailUrl, useConfiguration } from '../../../../utils'
import { Button, Link, Text } from '../../..'

function ProductItem(props) {
  const { getImageLink } = useConfiguration()
  const { product, onRemove } = props
  const { title = '', images = [], url = '' } = product

  const productDetailUrl = getProductDetailUrl({ url })

  const imageLink = getImageLink({
    source: images[0],
    height: 50,
  })

  const imageLinkRetina = getImageLink({
    source: images[0],
    height: 50,
    pixelRatio: 2,
  })

  return (
    <li className="wishlist-box__product-item">
      <Link
        href={productDetailUrl}
        className="wishlist-box__product-item__image"
      >
        <picture>
          <img
            src={imageLink}
            srcSet={`${imageLink} 1x, ${imageLinkRetina} 2x`}
            alt={title}
            height="50"
          />
        </picture>

        <div className="text">
          <Text size="aphrodite" weight="600">
            {title}
          </Text>
        </div>
      </Link>
      <Button onClick={onRemove} icon="times" variant="icon-only" />
    </li>
  )
}

export default function ProductList({ products, onRemoveClick }) {
  return (
    <ul className="wishlist-box__products">
      {products.map((product) => (
        <ProductItem
          onRemove={() => {
            onRemoveClick(product.product.id)
          }}
          key={product.product.id}
          {...product}
        />
      ))}
    </ul>
  )
}
