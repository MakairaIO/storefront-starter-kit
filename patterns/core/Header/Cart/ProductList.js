import { getProductDetailUrl, useConfiguration } from '../../../../utils'
import { Button, Link, Text, FormattedPrice } from '../../..'
import { useShopClient } from '@makaira/storefront-react'

function ProductItem(props) {
  const { client } = useShopClient()
  const { getImageLink } = useConfiguration()
  const { product, quantity } = props
  const { id, title = '', images = [], url = '', price } = product

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

  const handleRemoveItem = () => {
    client.cart.removeItem({ input: { product: { id } } })
  }

  return (
    <li className="cart-box__product-item">
      <Link href={productDetailUrl} className="cart-box__product-item__image">
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
          <div>
            <span className="header__basket-bubble">{quantity}</span>
            <FormattedPrice price={price} />
          </div>
        </div>
      </Link>
      <Button onClick={handleRemoveItem} icon="times" variant="icon-only" />
    </li>
  )
}

export default function ProductList({ products }) {
  return (
    <ul className="cart-box__products">
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </ul>
  )
}
