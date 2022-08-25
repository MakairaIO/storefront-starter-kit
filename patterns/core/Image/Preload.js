import Head from 'next/head'

export default function Preload(props) {
  const { preload = false, options = {}, imageLinks = {} } = props

  if (!preload) return null

  return (
    <Head>
      {Object.entries(options).map((option) => {
        const [breakpoint, config] = option

        const src = imageLinks[breakpoint]['origin']
        const retinaSrc = imageLinks[breakpoint]['retina']

        return (
          <link
            key={breakpoint}
            rel="preload"
            as="image"
            href={retinaSrc}
            imageSrcSet={`${src} 1x, ${retinaSrc} 2x`}
            media={config.media}
          />
        )
      })}
    </Head>
  )
}
