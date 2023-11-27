import classNames from 'classnames'
import {
  useTranslation,
  useConfiguration,
  getProductDetailUrl,
} from '../../../utils'
import { Heading, Copytext, Button } from '../..'

function TeaserProducts(props) {
  const { products = [], variant = 'white' } = props

  if (products.length == 0) return null

  const classes = classNames('product-teaser', `product-teaser--${variant}`)

  return (
    <section className={classes}>
      {products.map((product) => (
        <Teaser key={product.ean} {...product} />
      ))}
    </section>
  )
}

function Teaser(props) {
  const { t } = useTranslation()
  const { getImageLink } = useConfiguration()
  const { title = '', manufacturer_title = '', url = '', images = [] } = props

  const productDetailUrl = getProductDetailUrl({ url })

  const imageLink = getImageLink({
    source: images[0],
    height: 289,
    format: 'auto',
  })

  const imageLinkRetina = getImageLink({
    source: images[0],
    height: 289,
    pixelRatio: 2,
    format: 'auto',
  })

  return (
    <div className="product-teaser__teaser">
      <picture className="product-teaser__teaser-image">
        <img
          src={imageLink}
          srcSet={`${imageLink} 1x, ${imageLinkRetina} 2x`}
          alt={title}
          loading="lazy"
          height="228"
        />
      </picture>

      <p className="product-teaser__content">
        <Copytext
          weight="semi-bold"
          element="span"
          className="product-teaser__pre-title"
        >
          {manufacturer_title}
        </Copytext>

        <Heading
          weight="semi-bold"
          element="span"
          className="product-teaser__title"
        >
          {title}
        </Heading>

        <Button
          href={productDetailUrl}
          icon="chevron-right"
          className="product-teaser__button"
        >
          {t('PRODUCT_TILE_TO_PRODUCT')}
        </Button>
      </p>
    </div>
  )
}

export default TeaserProducts
export { default as teaserProductsVariants } from './variants.js'
