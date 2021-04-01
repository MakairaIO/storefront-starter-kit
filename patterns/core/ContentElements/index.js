import {
  ErrorBoundary,
  ProductPlacement,
  Promotion,
  TeaserHero,
  TeaserGrid,
  TeaserSingle,
  TeaserProducts,
  MultiColumnText,
  TeaserDuo,
  TeaserVideo,
  DiscoveryImage,
} from '../..'

export default function ContentElements(props) {
  const { elements = [] } = props

  if (elements.length == 0) return null

  // Declare your additional content patterns here
  const components = {
    'product-placement': ProductPlacement,
    promotion: Promotion,
    'teaser-hero': TeaserHero,
    'teaser-grid': TeaserGrid,
    'teaser-single': TeaserSingle,
    'teaser-products': TeaserProducts,
    'multi-column-text': MultiColumnText,
    'duo-teaser': TeaserDuo,
    'video-teaser': TeaserVideo,
    'discovery-image': DiscoveryImage,
  }

  return (
    <>
      {elements.map((entry, index) => {
        const Component = components[entry.component]

        if (!Component) return null

        return (
          <ErrorBoundary key={index}>
            <Component {...entry.properties.content} />
          </ErrorBoundary>
        )
      })}
    </>
  )
}
