import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { getProductDetailUrl } from '../../../utils'
import { Icon, Link } from '../..'

const Breadcrumb = ({ breadcrumb = [], product }) => {
  const { asPath } = useRouter()

  const elements = breadcrumb.map(({ text, link }) => ({
    title: text,
    url: link,
    link,
  }))

  if (product) {
    elements.push({
      id: product.ean,
      title: product.title,
      url: getProductDetailUrl({ url: product.url }),
    })
  }

  const lastElement = elements.pop()

  const parentCategory =
    elements.length >= 1
      ? elements[elements.length - 1]
      : { id: 'home', title: 'Startseite', url: '/' }

  if (!lastElement || asPath === '/') {
    return null
  }

  return (
    <nav className="breadcrumb">
      <ol role="list" className="list">
        <li className="item">
          <Link href="/" title="Home" isInternalRoute>
            <Icon symbol="home" className="home" />
          </Link>
        </li>

        {elements.map(({ title, url, id }) => (
          <li className="item" key={id}>
            <Link href={url} title={title} isInternalRoute>
              {title}
            </Link>
          </li>
        ))}

        <li className="item" key={lastElement.id}>
          {lastElement.title}
        </li>

        {parentCategory && (
          <li className="item item--mobile-visible">
            <Link
              href={parentCategory.url}
              title={parentCategory.title}
              isInternalRoute
            >
              {`<< Zurück zu "${parentCategory.title}"`}
            </Link>
          </li>
        )}
      </ol>
    </nav>
  )
}

Breadcrumb.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.objectOf({})),
}

export default Breadcrumb
export { default as breadcrumbVariants } from './variants.js'
