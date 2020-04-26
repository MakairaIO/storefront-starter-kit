import { useState } from 'react'
import Link from 'next/link'
import ReactIframeResizer from 'react-iframe-resizer-super'
import { ConfigurationProvider, TranslationProvider } from '../../utils'
import allLanguages from '../../config/allLanguages'
import { BaseLayout, SVGSprite } from '../../patterns'
import { ExternalLinkIcon } from './'

export default function VariantPreview({
  component: Component,
  componentName,
  variant,
}) {
  const [currentLanguage, changeLanguage] = useState('de')

  function LanguageSelect() {
    return (
      <select
        value={currentLanguage}
        onChange={(event) => changeLanguage(event.currentTarget.value)}
        onBlur={(event) => changeLanguage(event.currentTarget.value)}
        className="pali__language-select pali__language-select--overview"
      >
        {allLanguages.map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>
    )
  }

  const encodedVariantTarget = encodeURIComponent(
    componentName + '_' + variant.name
  )
  const variantLinkTarget = `/pali/variants/${encodedVariantTarget}`

  return (
    <section key={variant.name} className="pali__section">
      <h2>
        {variant.name}

        <Link href="/pali/variants/[id]" as={variantLinkTarget}>
          <a
            href={variantLinkTarget}
            className="pali__external-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLinkIcon />
          </a>
        </Link>

        <LanguageSelect />
      </h2>

      <div className="pali__component-wrapper">
        <ReactIframeResizer iframeResizerOptions={{ checkOrigin: false }}>
          <ConfigurationProvider>
            <TranslationProvider language={currentLanguage}>
              <BaseLayout>
                <style
                  dangerouslySetInnerHTML={{
                    __html: `
                    #iframe-root {
                      padding: 10px 0;
                      background: #fff;
                      border-radius: 8px;
                    }
                  `,
                  }}
                ></style>

                <link
                  href="/assets/styles/main.css"
                  rel="stylesheet"
                  type="text/css"
                />
                <SVGSprite />

                <Component {...variant.props} />
              </BaseLayout>
            </TranslationProvider>
          </ConfigurationProvider>
        </ReactIframeResizer>
      </div>
    </section>
  )
}
