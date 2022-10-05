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
      <ol
        vocab="https://schema.org"
        typeof="BreadcrumbList"
        role="list"
        className="list"
      >
        <li className="item">
          <Link href="/" title="Home" isInternalRoute>
            <Icon symbol="home" className="home" />
          </Link>
        </li>

        {elements.map(({ title, url, id }, index) => (
          <li
            property="itemListElement"
            typeof="ListItem"
            className="item"
            key={id}
          >
            <Link
              property="item"
              typeof="WebPage"
              href={url}
              title={title}
              isInternalRoute
            >
              <span property="name">{title}</span>
            </Link>
            <meta property="position" content={index + 1} />
          </li>
        ))}

        <li
          property="itemListElement"
          typeof="ListItem"
          className="item"
          key={lastElement.id}
        >
          <span property="name">{lastElement.title}</span>
          <meta property="position" content={elements.length + 1} />
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
