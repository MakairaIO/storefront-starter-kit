import Head from 'next/head'
import { useGlobalData } from '../../utils'

export default function Metadata() {
  const { pageData } = useGlobalData()
  const { title, ...rest } = pageData.data.metadata

  return (
    <Head>
      {title && <title>{title}</title>}

      {Object.entries(rest).map(([key, value]) => (
        <meta key={key} name={key} content={value} />
      ))}
    </Head>
  )
}
