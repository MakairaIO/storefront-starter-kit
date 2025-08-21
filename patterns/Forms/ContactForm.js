import { Copytext, Button } from '..'
import { useTranslation } from '../../utils'

export default function ContactForm(props) {
  const { handleChange, handleSubmit, errors, isDirty, theme } = props
  const { t } = useTranslation()

  return (
    <div className="form--contact">
      <Copytext className="form__description">
        Schön, dass du Interesse an unserer Makaira E-Commerce Marketing Suite
        hast. Füll doch bequem unser Kontaktformular aus. Wir antworten dir
        schnellstmöglich.
      </Copytext>
      <form onSubmit={handleSubmit}>
        <div className="form__row">
          <div className="form__field">
            <Copytext
              element="label"
              className="form__label form__require"
              htmlFor="firstName"
            >
              Wie heißt du? *
            </Copytext>
            <input
              name="firstName"
              type="text"
              className={`form__input ${
                isDirty && errors.firstName ? 'error' : ''
              }`}
              onChange={handleChange}
            />
            {isDirty && errors.firstName && (
              <Copytext variant="microtext" className="error">
                {t('VALIDATION_REQUIRED_INPUT')}
              </Copytext>
            )}
          </div>
        </div>
        <div className="form__row">
          <div className="form__field">
            <Copytext
              element="label"
              className="form__label form__require"
              htmlFor="lastName"
            >
              Wie lautet deine Firmenadresse? *
            </Copytext>
            <input
              name="lastName"
              type="text"
              className={`form__input ${
                isDirty && errors.lastName ? 'error' : ''
              }`}
              onChange={handleChange}
            />
            {isDirty && errors.lastName && (
              <Copytext variant="microtext" className="error">
                {t('VALIDATION_REQUIRED_INPUT')}
              </Copytext>
            )}
          </div>
        </div>

        <div className="form__row">
          <div className="form__field">
            <Copytext
              element="label"
              className="form__label form__require"
              htmlFor="email"
            >
              Wie lautet deine E-Mail? *
            </Copytext>
            <input
              name="email"
              type="text"
              className={`form__input ${
                isDirty && errors.email ? 'error' : ''
              }`}
              onChange={handleChange}
            />
            {isDirty && errors.email && (
              <Copytext variant="microtext" className="error">
                {t('VALIDATION_REQUIRED_INPUT')}
              </Copytext>
            )}
          </div>
        </div>

        <div className="form__row">
          <div className="form__field">
            <Copytext
              element="label"
              className="form__label form__require"
              htmlFor="comment"
            >
              Für welches Thema möchtest du unsere Lösung kennenlernen? *
            </Copytext>
            <textarea
              name="comment"
              rows="8"
              className={`form__input ${
                isDirty && errors.comment ? 'error' : ''
              }`}
              onChange={handleChange}
            />
            {isDirty && errors.comment && (
              <Copytext variant="microtext" className="error">
                {t('VALIDATION_REQUIRED_INPUT')}
              </Copytext>
            )}
          </div>
        </div>

        <div className="form__row">
          <div className="form__field form__actions">
            <Button
              variant="primary"
              icon=""
              color={theme == 'sunny' ? 'teal' : ''}
              type="submit"
            >
              Kontakt aufnehmen
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
