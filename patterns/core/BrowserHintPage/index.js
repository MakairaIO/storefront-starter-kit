import { Copytext, Link, Heading } from '../..'
import { useTranslation } from '../../../utils'

export default function BrowserHintPage() {
  const { t } = useTranslation()

  return (
    <main className="browser-hint-page">
      <img
        className="browser-hint-page__logo"
        src="/assets/images/header/logo_dummy.svg"
        alt="Logo"
      />

      <div className="browser-hint-page__content">
        <Heading size="diana" weight="bold">
          {t('BROWSER_HINT_PAGE_HEADING')}
        </Heading>
        <Heading size="bacchus" element="h2">
          {t('BROWSER_HINT_PAGE_SUB_HEADING')}
        </Heading>

        <div className="browser-hint-page__column-wrapper">
          <Copytext
            className="browser-hint-page__column"
            dangerouslySetInnerHTML={{
              __html: t('BROWSER_HINT_PAGE_TEXT_TOP'),
            }}
          />
          <Copytext
            className="browser-hint-page__column"
            dangerouslySetInnerHTML={{
              __html: t('BROWSER_HINT_PAGE_TEXT_BOTTOM'),
            }}
          />
        </div>
      </div>
      <div className="browser-hint-page__browsers">
        <Heading size="bacchus" weight="bold">
          {t('BROWSER_HINT_PAGE_DOWNLOAD_HINT')}
        </Heading>
        <div className="browser-hint-page__browsers-list">
          <div className="browser-hint-page__browsers-wrapper">
            <div className="browser-hint-page__browsers-wrapper-content">
              <Link
                href="https://www.mozilla.org/de/firefox/new/"
                className="browser browser--firefox"
              >
                <img
                  src="/assets/images/browserHintPage/firefox.svg"
                  alt="Firefox Logo"
                />
                <Copytext size="aphrodite" element="span">
                  Firefox
                </Copytext>
              </Link>
              <Link
                href="https://www.google.com/intl/de_de/chrome/"
                className="browser browser--chrome"
              >
                <img
                  src="/assets/images/browserHintPage/chrome.svg"
                  alt="Chrome Logo"
                />
                <Copytext size="aphrodite" element="span">
                  Google Chrome
                </Copytext>
              </Link>
            </div>
            <img
              className="browser-hint-page__browsers-divider"
              src="/assets/images/browserHintPage/klammer.svg"
              alt="Logo"
            />
            <Copytext size="bacchus" weight="medium" element="span">
              {t('BROWSER_HINT_PAGE_RECOMMENDATIONS')}
            </Copytext>
          </div>
          <Link
            href="https://www.microsoft.com/de-de/edge"
            className="browser browser--edge"
          >
            <img
              src="/assets/images/browserHintPage/edge.svg"
              alt="Microsoft Edge Logo"
            />
            <Copytext size="aphrodite" element="span">
              Microsoft EDGE
            </Copytext>
          </Link>
        </div>
      </div>
    </main>
  )
}
