import { useState, useEffect } from 'react'
import { useTranslation, logError } from '../../utils'
import { Copytext, Heading, Link } from '..'

export default function ErrorPage(props) {
  const { t } = useTranslation()
  const [data, setData] = useState({})
  const { statusCode = 500, error = null } = props

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.hsforms.net/forms/v2.js'
    document.body.appendChild(script)

    script.addEventListener('load', () => {
      // @TS-ignore
      if (window.hbspt) {
        // @TS-ignore
        window.hbspt.forms.create({
          region: 'eu1',
          portalId: '27011792',
          formId: '2c1dd1ed-6419-4e5d-842f-d2a1a2049d12',
          target: '#hubspotErrorForm',
        })
      }
    })
  }, [])

  useEffect(
    function collectDataAndLogError() {
      const { origin, pathname } = window.location
      const { platform, userAgent } = window.navigator

      let data = {
        Status: statusCode,
        Host: origin,
        Path: pathname,
        Platform: platform,
        'User-Agent': userAgent,
      }

      if (error != null) {
        const { message, stack } = error

        data['Error'] = message
        data['Stacktracke'] = stack
      }

      setData(data)
      logError(data)
    },
    [error, statusCode]
  )

  return (
    <main className="pattern error-page">
      <div className="error-page__logo-wrapper">
        <Link href="/" className="error-page__logo">
          <img src="/assets/images/header/logo.svg" alt="Logo" />
        </Link>
      </div>

      <div className="error-page__content">
        <div>
          <div className="error-page__image">
            <img src="/assets/images/errorPage/error-404.png" alt="error" />
          </div>

          <h1 className="error-page__heading">{t('ERROR_PAGE_TITLE')}</h1>

          <div className="error-page__text">
            <Copytext>
              {t('ERROR_PAGE_TEXT_LEFT_1')}{' '}
              <Link href="/" className="error-page__link">
                {t('ERROR_PAGE_TEXT_LEFT_1_LINK_TEXT')}
              </Link>
              {t('ERROR_PAGE_TEXT_LEFT_2')}
            </Copytext>
          </div>
        </div>

        <div>
          <div className="error-page__form-wrapper">
            <Heading className="error-page__heading">
              {t('ERROR_PAGE_TEXT_RIGHT_TITLE')}
            </Heading>

            <div className="error-page__form">
              <div id="hubspotErrorForm"></div>
            </div>

            <div className="error-page__badge">
              Keine Sorge
              <br />
              Du bekommst
              <br />
              keine Emails
            </div>
          </div>
        </div>
      </div>
      <div className="error-page__further-info">
        <span>{t('ERROR_PAGE_FURTHER_TITLE')}</span>
        <p>{t('ERROR_PAGE_FURTHER_DESCRIPTION')}</p>
        <ul>
          {Object.entries(data).map(([key, value]) => {
            return (
              <li key={key}>
                <span>{key}</span>
                <span>{value}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
