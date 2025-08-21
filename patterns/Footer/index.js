import { useState } from 'react'
import { Link, Copytext, Heading, InputIcon } from '..'
import { useTranslation } from '../../utils'

function FooterLinksColumn({ menu }) {
  const isMenuValid = menu.title && menu.items.length > 0

  if (!isMenuValid) {
    return null
  }

  return (
    <div className="footer__links">
      <p className="footer__heading heading level_5 text text--echo text--regular">
        {menu.title}
      </p>
      <div className="footer__links__row">
        <div className="footer__links__col">
          {menu.items.map((item) => (
            <Link href={item.href} key={item.title}>
              <Copytext className="footer__address" element="p">
                {item.title}
              </Copytext>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function Footer(props) {
  const { variant, footerSnippet } = props
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [isSubscribed, setSubscribed] = useState(false)

  const { menu_1 = { items: [] }, menu_2 = { items: [] } } =
    footerSnippet?.properties?.content ?? {}

  function handleEmailChange(event) {
    setEmail(event.target.value)
  }

  async function submitFormEmailNewsletter(e) {
    e.preventDefault()

    try {
      const response = await fetch(
        process.env.SHOP_DOMAIN + '/email-newsletter/',
        {
          method: 'POST',
          body: JSON.stringify({ email }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.status === 200) {
        setSubscribed(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className="pattern footer">
      <div className="footer__row">
        {variant == 'full' ? (
          <Link className="footer__logo__wrapper" href="/">
            <img
              src="/assets/images/header/logo-invert.svg"
              alt="Logo"
              className="footer__logo"
            />
          </Link>
        ) : (
          <div className="footer__logo__wrapper">
            <img
              src="/assets/images/header/logo-invert.svg"
              alt="Logo"
              className="footer__logo"
            />
          </div>
        )}
        {variant == 'full' && (
          <div className="footer__sub">
            {isSubscribed ? (
              <>
                <Heading level={3}>{t('SUBSCRIBE_SUCCESS_MESSAGE_1')}</Heading>
                <Copytext className="footer__newslettertext" element="p">
                  {t('SUBSCRIBE_SUCCESS_MESSAGE_2')}
                </Copytext>
              </>
            ) : (
              <>
                <Heading level={3}>{t('SUBSCRIBE_MESSAGE_1')}</Heading>
                <InputIcon
                  placeholder="Deine E-Mail-Adresse"
                  onClickIcon={submitFormEmailNewsletter}
                  defaultValue={email}
                  onChange={handleEmailChange}
                  submitForm={submitFormEmailNewsletter}
                />
                <p className="footer__newslettertext copytext text text--charlie text--regular">
                  Kein Spam, jederzeit abmeldbar, keine Weitergabe deiner Daten,
                  alles ganz fein <a href="/de/datenschutz">DSGVO-konform</a>.
                </p>
              </>
            )}
          </div>
        )}
      </div>

      <div className="footer__services__row">
        <div className="footer__column-left">
          {variant == 'full' || variant == 'reduced-german' ? (
            <div>
              <p className="footer__heading heading level_5 text text--echo text--regular">
                Makaira GmbH
              </p>
              <Copytext className="footer__address" element="div">
                <p>
                  Kimplerstraße 296
                  <br />
                  47807 Krefeld
                </p>
                <p>
                  Tel: 0621 / 8775226 - 0<br />
                  E-Mail: hello | at | makaira.io
                </p>
              </Copytext>
            </div>
          ) : (
            <div>
              <p className="footer__heading heading level_5 text text--echo text--regular">
                Makaira
              </p>
              <Copytext className="footer__address" element="div">
                <p>
                  7900 Oak Lane, Suite 400,
                  <br />
                  Miami Lakes, FL 33016
                </p>
                <p>email: hello | at | makaira.io</p>
              </Copytext>
            </div>
          )}
        </div>
        <div className="footer__links-wrapper">
          {variant == 'full' ? (
            <FooterLinksColumn menu={menu_1} />
          ) : variant == 'reduced-usa' ? (
            <div className="footer__links">
              <p className="footer__heading heading level_5 text text--echo text--regular">
                &nbsp;
              </p>
              <div className="footer__links__row">
                <div className="footer__links__col"></div>
              </div>
            </div>
          ) : (
            <div className="footer__links"></div>
          )}

          {variant == 'full' && <FooterLinksColumn menu={menu_2} />}

          {/* {variant == 'full' && (
          <div className="footer__tag-list">
            <SocialIcons />
          </div>
        )} */}
        </div>
      </div>
    </section>
  )
}

export default Footer
export { default as footerVariants } from './variants.js'
