import {
  ProductPlacement,
  TeaserHero,
  TeaserSingle,
  TeaserProducts,
  MultiColumnText,
} from '../..'

export default function ContentElements(props) {
  const { elements = [] } = props

  if (elements.length == 0) return null

  // Declare your additional content patterns here
  const components = {
    'product-placement': ProductPlacement,
    'teaser-hero': TeaserHero,
    'teaser-single': TeaserSingle,
    'teaser-products': TeaserProducts,
    'multi-column-text': MultiColumnText,
  }

  return (
    <>
      {elements.map((entry, index) => {
        const Component = components[entry.component]

        if (!Component) return null

        return <Component key={index} {...entry.properties.content} />
      })}
    </>
  )
}
