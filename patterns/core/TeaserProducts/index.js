import classNames from 'classnames'
import { useTranslation } from '../../../utils'
import { Heading, Button } from '../..'

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
  const {
    title = '',
    manufacturer_title = '',
    picture_url_main = '',
    url = '',
  } = props

  return (
    <div className="product-teaser__teaser">
      <picture className="product-teaser__teaser-image">
        <img src={picture_url_main} alt={title} />
      </picture>

      <p className="product-teaser__content">
        <span className="product-teaser__pre-title">{manufacturer_title}</span>

        <Heading size="110" element="span" className="product-teaser__title">
          {title}
        </Heading>

        <Button
          href={url}
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
