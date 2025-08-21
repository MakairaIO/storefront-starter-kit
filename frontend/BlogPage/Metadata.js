import Head from 'next/head'
import { useGlobalData } from '../../utils'
export default function Metadata() {
  const { pageData } = useGlobalData()
  const {
    title = 'test',
    robotIndex = 'index',
    robotFollow = 'follow',
  } = pageData.data.self.metadata

  return (
    <Head>
      <title>{`${title}`}</title>
      <meta name="robots" content={`${robotIndex}, ${robotFollow}`} />
    </Head>
  )
}
