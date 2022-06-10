import Head from 'next/head'

/**
 * Metadata is a generic component that enables developers to add fast
 * metadata to the page. Because it is generic by design it does not
 * access directly the pageDate. With this each page can determine itself
 * its meta data tags
 */

function Metadata({
  title,
  keywords,
  description,
  robotIndex = 'index',
  robotFollow = 'follow',
  additionalMetadata = {},
}) {
  return (
    <Head>
      {title && <title>{title}</title>}

      {keywords && <meta key="keywords" name="keywords" content={keywords} />}

      {description && (
        <meta key="description" name="description" content={description} />
      )}

      {Object.entries(additionalMetadata).map(([key, value]) => (
        <meta key={key} name={key} content={value} />
      ))}

      <meta
        key="robots"
        name="robots"
        content={`${robotIndex}, ${robotFollow}`}
      />
    </Head>
  )
}

export default Metadata
