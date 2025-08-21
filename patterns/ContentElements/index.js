import classNames from 'classnames'
import {
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
  TeaserEnhanced,
  FeatureIcons,
  Divider,
  LogoBar,
  TeaserSimple,
  SimpleOpener,
  Quotes,
  CTAOpener,
  CTATrap,
  Stream,
  Card,
  Card2Col,
  Card3Col,
  TextContent,
  Forms,
  EmbeddedVideo,
  StreamSimplify,
  OmrReviews,
  USPsIcons,
  Links,
  TextColumn,
  TeaserHalfHalf,
  HubspotForm,
  HubspotFormWithText,
  DvinciWidget,
} from '..'
import TeaserCarousel from '../TeaserCarousel'
import Graphics from '../Graphics'

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
    'teaser-enhanced': TeaserEnhanced,
    'teaser-products': TeaserProducts,
    'teaser-simple': TeaserSimple,
    'multi-column-text': MultiColumnText,
    'duo-teaser': TeaserDuo,
    'video-teaser': TeaserVideo,
    'discovery-image': DiscoveryImage,
    'logo-bar': LogoBar,
    'feature-icons': FeatureIcons,
    'simple-opener': SimpleOpener,
    divider: Divider,
    quotes: Quotes,
    'cta-opener': CTAOpener,
    'cta-trap': CTATrap,
    stream: Stream,
    'stream-simplify': StreamSimplify,
    card: Card,
    'card-2-col': Card2Col,
    'card-3-col': Card3Col,
    'text-content': TextContent,
    'makaira-form': Forms,
    'embedded-video': EmbeddedVideo,
    'omr-reviews': OmrReviews,
    'usps-icons': USPsIcons,
    links: Links,
    'teaser-carousel': TeaserCarousel,
    'text-column': TextColumn,
    'teaser-half-half': TeaserHalfHalf,
    graphics: Graphics,
    'hubspot-form': HubspotForm,
    'hubspot-form-with-text': HubspotFormWithText,
    'dvinci-widget': DvinciWidget,
  }

  return (
    <>
      {elements.map((entry) => {
        const Component = components[entry.component]

        if (!Component) return null

        if (entry.component === 'divider')
          return (
            <Component
              id={entry.id}
              key={entry.id}
              {...entry.properties.content}
            />
          )

        const classes = classNames(
          'content-element',
          `content-element--${entry.component}`
        )

        return (
          <div className={classes} id={entry.id} key={entry.id}>
            <Component {...entry.properties.content} />
          </div>
        )
      })}
    </>
  )
}
