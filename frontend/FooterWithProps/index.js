import { Footer } from '../../patterns'
import { useGlobalData } from '../../utils'

export default function FooterWithProps(props) {
  const { pageData } = useGlobalData()

  const footerSnippet = (pageData?.data?.snippets?.footer_snippet ?? []).find(
    ({ component }) => component === 'footer'
  )

  const footerProps = {
    ...props,
    footerSnippet,
  }

  return <Footer {...footerProps} />
}
