import { useTranslation } from '../../utils'

export default function InfoLinks() {
  const { t } = useTranslation()

  return (
    <nav className="header__info-links" arial-label="Secondary Navigation">
      <a href={t('INFO_LINK_PRIVACY')} className="header__info-link">
        {t('INFO_TEXT_PRIVACY')}
      </a>
      <a href={t('INFO_LINK_IMPRINT')} className="header__info-link">
        {t('INFO_TEXT_IMPRINT')}
      </a>
      <a href={t('INFO_LINK_SHIPPING')} className="header__info-link">
        {t('INFO_TEXT_SHIPPING')}
      </a>
    </nav>
  )
}
