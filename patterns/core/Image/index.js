import classnames from 'classnames'
import { useRef } from 'react'
import { useConfiguration, useLazyLoading } from '../../../utils'
import Preload from './Preload'

/*
 * Example Usage:
 *
 * IMPORTANT: The order of the options matters!
 *
 * <Image
 *   alt='Alt Text'
 *   options={{
 *     desktop: {
 *       source: content.image,
 *       width: 768,
 *       media: '(min-width: 768px)',
 *     },
 *     mobile: {
 *       source: content.image,
 *       width: 480,
 *       media: null,
 *     },
 *   }}
 * />
 */

function Image(props) {
  const {
    options = {},
    alt = '',
    className,
    title = '',
    caption,
    lazyload = true,
    preload = false,
  } = props

  const { getImageLinks } = useConfiguration()
  const wrapperRef = useRef(null)

  const imageLinks = getImageLinks(options)

  /**
   * Explicit check on the amount of generated <source> elements to avoid having
   * multiple sources with a <figure> element as parent which would result
   * in invalid HTML-
   */
  const ElementWrapper =
    caption && Object.values(options).length === 1 ? 'figure' : 'picture'

  const wrapperClasses = classnames('image', className)

  useLazyLoading({ ref: wrapperRef, dependency: options })

  let imgProps = {
    alt: alt,
    title: title,
  }

  const fallbackSrc = imageLinks['desktop']
    ? imageLinks['desktop']
    : Object.values(imageLinks)[0]

  if (lazyload) {
    imgProps['data-src'] = fallbackSrc['origin']
    imgProps[
      'data-srcset'
    ] = `${fallbackSrc['origin']} 1x, ${fallbackSrc['retina']} 2x`
  } else {
    imgProps['src'] = fallbackSrc['origin']
    imgProps[
      'srcSet'
    ] = `${fallbackSrc['origin']} 1x, ${fallbackSrc['retina']} 2x`
  }

  /**
   * Explicit check on the amount of generated <source> elements to avoid rendering
   * <source> tags withing <figure> elements which would result in invalid HTML
   */
  const shouldRenderSourceElements = Object.values(options).length > 1

  return (
    <>
      <Preload preload={preload} options={options} imageLinks={imageLinks} />

      <ElementWrapper ref={wrapperRef} className={wrapperClasses}>
        {shouldRenderSourceElements &&
          Object.entries(options).map((option) => {
            const [breakpoint, config] = option

            const src = imageLinks[breakpoint]['origin']
            const retinaSrc = imageLinks[breakpoint]['retina']

            let sourceProps = {
              media: config.media,
            }

            if (lazyload) {
              sourceProps['data-srcset'] = `${src} 1x, ${retinaSrc} 2x`
            } else {
              sourceProps['srcSet'] = `${src} 1x, ${retinaSrc} 2x`
            }

            return <source key={breakpoint} {...sourceProps} />
          })}

        <img {...imgProps} />

        {caption && <figcaption>{caption}</figcaption>}
      </ElementWrapper>
    </>
  )
}

export default Image
