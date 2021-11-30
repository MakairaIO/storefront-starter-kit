import Head from 'next/head'
import { useGlobalData } from '../../utils'

export default function Metadata() {
  const { pageData } = useGlobalData()
  const {
    title,
    seoTitle,
    robotIndex = 'index',
    robotFollow = 'follow',
    ...rest
  } = pageData.data.metadata

  const pageTitle = seoTitle ?? title

  return (
    <Head>
      {pageTitle && <title>{pageTitle}</title>}

      {Object.entries(rest).map(([key, value]) => (
        <meta key={key} name={key} content={value} />
      ))}

      <meta name="robots" content={`${robotIndex}, ${robotFollow}`} />
    </Head>
  )
}
