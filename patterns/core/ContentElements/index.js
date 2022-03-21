import {
  ErrorBoundary,
  ProductPlacement,
  StreamPlacement,
  Promotion,
  TeaserHero,
  TeaserGrid,
  TeaserSingle,
  TeaserProducts,
  MultiColumnText,
  TeaserDuo,
  TeaserVideo,
  DiscoveryImage,
  ContactForm,
  NoComponent,
} from '../..'

export default function ContentElements(props) {
  const { elements = [] } = props

  if (elements.length === 0) return null

  // Declare your additional content patterns here
  const components = {
    'product-placement': ProductPlacement,
    'stream-placement': StreamPlacement,
    promotion: Promotion,
    'teaser-hero': TeaserHero,
    'teaser-grid': TeaserGrid,
    'teaser-single': TeaserSingle,
    'teaser-products': TeaserProducts,
    'multi-column-text': MultiColumnText,
    'duo-teaser': TeaserDuo,
    'video-teaser': TeaserVideo,
    'discovery-image': DiscoveryImage,
    'contact-form': ContactForm,
  }
  return (
    <>
      {elements.map((entry, index) => {
        const Component = components[entry.component] ?? NoComponent

        if (!Component) return null

        return (
          <ErrorBoundary key={index}>
            <Component {...entry.properties.content} name={entry.component} />
          </ErrorBoundary>
        )
      })}
    </>
  )
}
