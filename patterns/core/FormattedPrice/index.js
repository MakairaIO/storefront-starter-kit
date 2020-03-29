import allLanguages from '../../../config/allLanguages'
import { useTranslation } from '../../../utils'

export default function FormattedPrice(props) {
  const { language } = useTranslation()
  const { price, className = '', element = 'span' } = props

  const unformatted = Number(price)

  if (Number.isNaN(unformatted)) return null

  const languageConfig = allLanguages.find((lang) => lang.value === language)

  if (!languageConfig || !languageConfig.prices) return null

  const { locale, currency } = languageConfig.prices
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  })

  const formatted = formatter.format(unformatted)
  const Element = element

  return <Element className={className}>{formatted}</Element>
}
