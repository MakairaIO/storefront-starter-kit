import React, { Component, useContext } from 'react'

const ConfigurationContext = React.createContext()

const CLOUDINARY_BASE = 'https://res.cloudinary.com'

const transformationMapping = {
  width: 'w',
  height: 'h',
  quality: 'q',
  pixelRatio: 'dpr',
  format: 'f',
  crop: 'c',
  gravity: 'g',
}

class ConfigurationProvider extends Component {
  static defaultProps = { assetUrl: '' }

  getImageLink = (options = {}) => {
    const { source } = options

    if (!source) return null

    if (typeof source == 'string') {
      return source.startsWith('https://') ? source : this.getS3Link(options)
    } else {
      // objects = cloudinary
      return this.getCloudinaryLink(options)
    }
  }

  /**
   * If you want to get multiple image links at once (i.e. to define different image sources in a picture tag).
   *
   * Example Usage:
   *  const options = {
   *     mobile: {
   *       source: image,
   *       height: 500,
   *     },
   *     desktop: {
   *       source: image,
   *       width: 1400,
   *     },
   *   }
   *
   *   const imageLinks = getImageLinks(options)
   */
  getImageLinks = (options = {}) => {
    let imageLinks = {}

    for (const [key, value] of Object.entries(options)) {
      imageLinks[`${key}`] = {
        origin: this.getImageLink({ ...value }),
        retina: this.getImageLink({ ...value, pixelRatio: 2 }),
      }
    }

    return imageLinks
  }

  getVideoLink = (options = {}) => {
    return this.getCloudinaryLink(options)
  }

  getS3Link = (options) => {
    const { source = '' } = options

    const { assetUrl } = this.props

    return assetUrl + '/' + source
  }

  getCloudinaryLink = (options) => {
    const { source = {}, transformationString = '', ...rest } = options

    const { cloudName, resourceType, fileName, version } = source

    // Use cloudinary format "auto" unless otherwise stated
    if (rest.format === undefined) {
      rest.format = 'auto'
    }

    const transformations = this.getCloudinaryTransformations(rest)

    const versionStr = version
      ? version.toString().startsWith('v')
        ? version
        : `v${version}`
      : null

    // Example: https://res.cloudinary.com/makairafm/image/upload/<transformations>v1592420992/<fileName>
    const parts = [
      CLOUDINARY_BASE,
      cloudName,
      resourceType,
      'upload',
      transformations,
      transformationString,
      versionStr,
      fileName,
    ].filter(Boolean) // with .filter(Boolean) we remove all empty items from the array

    return parts.join('/')
  }

  getCloudinaryTransformations = (settings) => {
    const transformations = Object.entries(settings).reduce(
      (transformations, currentSetting) => {
        const [name, value] = currentSetting

        const transformationKey = transformationMapping[name]

        // Make sure to add only known transformations
        if (transformationKey) {
          transformations.push(`${transformationKey}_${value}`)
        }

        return transformations
      },
      []
    )

    return transformations.join(',')
  }
  render() {
    return (
      <ConfigurationContext.Provider
        value={{
          getImageLink: this.getImageLink,
          getImageLinks: this.getImageLinks,
          getVideoLink: this.getVideoLink,
        }}
      >
        {this.props.children}
      </ConfigurationContext.Provider>
    )
  }
}

function useConfiguration() {
  return useContext(ConfigurationContext)
}

export default ConfigurationContext
export { ConfigurationProvider, useConfiguration }
