import { useState, useEffect } from 'react'
import { useTranslation, getClientInformation, logError } from '../../../utils'
import { Copytext, Link } from '../..'

export default function ErrorPage(props) {
  const { t } = useTranslation()
  const [data, setData] = useState({})
  const { statusCode = 500, error = null } = props

  useEffect(
    function collectDataAndLogError() {
      let data = getClientInformation()

      data = {
        ...data,
        Status: statusCode,
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
    <main className="error-page">
      <Link href="/" className="error-page__logo">
        <img src="/assets/images/header/logo_dummy.svg" alt="Logo" />
      </Link>

      <div className="error-page__gradient">
        <div className="cloud-1"></div>
        <div className="cloud-2"></div>
        <div className="cloud-3"></div>
        <div className="cloud-4"></div>
        <div className="cloud-5"></div>
        <div className="cloud-6"></div>
      </div>

      <div className="error-page__greeting">
        <span>Hello?! Anybody out there?</span>
      </div>

      <div className="error-page__content">
        <h1 className="error-page__heading">{t('ERROR_PAGE_TITLE')}</h1>

        <div className="error-page__column-wrapper">
          <div>
            <Copytext>{t('ERROR_PAGE_TEXT_LEFT_1')}</Copytext>
            <Copytext>{t('ERROR_PAGE_TEXT_LEFT_2')}</Copytext>
            <Copytext>{t('ERROR_PAGE_TEXT_LEFT_3')}</Copytext>
            <Copytext>{t('ERROR_PAGE_TEXT_LEFT_4')}</Copytext>
          </div>

          <div>
            <Copytext>{t('ERROR_PAGE_TEXT_RIGHT_1')}</Copytext>
            <Copytext>{t('ERROR_PAGE_TEXT_RIGHT_2')}</Copytext>
            <Copytext>{t('ERROR_PAGE_TEXT_RIGHT_3')}</Copytext>
            <Copytext>{t('ERROR_PAGE_TEXT_RIGHT_4')}</Copytext>
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
      </div>
    </main>
  )
}
