import { useTranslation } from '../../../utils'

export default function InfoLinks() {
  const { t } = useTranslation()

  return (
    <nav
      className="mobile-navigation__info-links"
      aria-label="Secondary Navigation"
    >
      <a href={t('INFO_LINK_PRIVACY')} className="mobile-navigation__info-link">
        {t('INFO_TEXT_PRIVACY')}
      </a>
      <a href={t('INFO_LINK_IMPRINT')} className="mobile-navigation__info-link">
        {t('INFO_TEXT_IMPRINT')}
      </a>
      <a
        href={t('INFO_LINK_SHIPPING')}
        className="mobile-navigation__info-link"
      >
        {t('INFO_TEXT_SHIPPING')}
      </a>
    </nav>
  )
}
