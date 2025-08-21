import { useTranslation } from '../../utils'
import { Link } from '..'

export default function InfoLinks() {
  const { t } = useTranslation()

  return (
    <nav className="header__info-links" arial-label="Secondary Navigation">
      <Link href={t('INFO_LINK_PRIVACY')} className="header__info-link">
        {t('INFO_TEXT_PRIVACY')}
      </Link>
      <Link href={t('INFO_LINK_IMPRINT')} className="header__info-link">
        {t('INFO_TEXT_IMPRINT')}
      </Link>
      <Link href={t('INFO_LINK_SHIPPING')} className="header__info-link">
        {t('INFO_TEXT_SHIPPING')}
      </Link>
    </nav>
  )
}
