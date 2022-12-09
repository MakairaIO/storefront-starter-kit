import {
  ContactForm,
  DiscoveryImage,
  MultiColumnText,
  ProductPlacement,
  Promotion,
  StreamPlacement,
  TeaserDuo,
  TeaserGrid,
  TeaserHero,
  TeaserProducts,
  TeaserSingle,
  TeaserVideo,
} from '../../index'

const componentsMapping = {
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

export default componentsMapping
