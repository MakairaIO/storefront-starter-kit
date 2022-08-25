import { useRouter } from 'next/router'
import componentConfig from '../../library/config'
import { ConfigurationProvider, TranslationProvider } from '../../utils'
import allLanguages from '../../config/allLanguages'
import { BaseLayout } from '../../patterns'

export default function Variant() {
  const router = useRouter()
  const dynamicSegment = router.query.id
  const [componentName, variantName] = dynamicSegment.split('_')

  const componentEntry = componentConfig.find(
    (entry) => entry.name === componentName
  )
  const variantEntry = componentEntry.variants.find(
    (entry) => entry.name === variantName
  )

  const Component = componentEntry.component
  const props = variantEntry.props

  const language =
    allLanguages.find((lang) => lang.value === 'de')?.value ??
    allLanguages.find((lang) => lang.value === 'en')?.value ??
    allLanguages[0]?.value

  return (
    <ConfigurationProvider>
      <TranslationProvider language={language}>
        <BaseLayout>
          <Component {...props} />
        </BaseLayout>
      </TranslationProvider>
    </ConfigurationProvider>
  )
}
