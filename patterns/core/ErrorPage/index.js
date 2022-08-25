import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useTranslation, getClientInformation, logError } from '../../../utils'
import { Copytext, Text, Link } from '../..'

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
      <Head>
        <title>
          {statusCode === 404
            ? t('ERROR_PAGE_404_TITLE')
            : t('ERROR_PAGE_500_TITLE')}
        </title>
      </Head>
      <Text element="h1" size="isis" weight="bold">
        {statusCode === 404
          ? t('ERROR_PAGE_404_TITLE')
          : t('ERROR_PAGE_500_TITLE')}
      </Text>

      <Copytext size="eos" className="error-page-description">
        {t('ERROR_PAGE_TEXT_DESCRIPTION')}
      </Copytext>

      <Text element="h2" size="eos" weight="bold">
        {t('ERROR_PAGE_FOR_COSTUMER')}
      </Text>
      <ul className="error-page-costumer-solutions">
        <li>
          <Link href="/">
            <Text size="cupid">{t('ERROR_PAGE_FOR_COSTUMER_SOLUTION1')}</Text>
          </Link>
        </li>
        <li>
          <Text size="cupid">{t('ERROR_PAGE_FOR_COSTUMER_SOLUTION2')}</Text>
        </li>
      </ul>

      <Text element="h2" size="eos" weight="bold">
        {t('ERROR_PAGE_FURTHER_TITLE')}
      </Text>

      <code className="error-page__further-info">
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
      </code>
    </main>
  )
}
