import { useTranslation } from '../../../../utils'
import { Link } from '../../..'

export default function InfoLinks() {
  const { t } = useTranslation()

  return (
    <nav
      className="mobile-navigation__info-links"
      aria-label="Secondary Navigation"
    >
      <Link
        href={t('INFO_LINK_PRIVACY')}
        className="mobile-navigation__info-link"
      >
        {t('INFO_TEXT_PRIVACY')}
      </Link>
      <Link
        href={t('INFO_LINK_IMPRINT')}
        className="mobile-navigation__info-link"
      >
        {t('INFO_TEXT_IMPRINT')}
      </Link>
      <Link
        href={t('INFO_LINK_SHIPPING')}
        className="mobile-navigation__info-link"
      >
        {t('INFO_TEXT_SHIPPING')}
      </Link>
    </nav>
  )
}
