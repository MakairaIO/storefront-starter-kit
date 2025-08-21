import { Button, Icon, Heading, Copytext } from '../../'
import { useTranslation } from '../../../utils'

function AutosuggestBox(props) {
  const { page = {}, closeSearchPopup, goToSearchPage, searchPhrase } = props
  const hasPages = page.count > 0
  const totalResults = page.total
  const { t } = useTranslation()

  return (
    <div className="autosuggest-box">
      <div className="autosuggest-box__wrapper">
        <Button
          variant="icon-only"
          icon="times"
          className="autosuggest-box__close"
          onClick={closeSearchPopup}
        />
        {hasPages && (
          <div className="autosuggest-box__pages">
            <Heading
              level={2}
            >{`Suchergebnisse für "${searchPhrase}"`}</Heading>
            {page.items.map(({ fields = {} }) => {
              const { metadata = {}, id } = fields
              return (
                <div key={id} className="autosuggest-box__page">
                  <Heading level={4}>{metadata.title}</Heading>
                  <Copytext>{metadata.description}</Copytext>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <button
        className="autosuggest-box__total-result"
        onClick={goToSearchPage}
      >
        {t('FILTER_LABEL_SEE_ALL_RESULTS')(totalResults)}
        <Icon symbol="chevron-right" />
      </button>
    </div>
  )
}

export default AutosuggestBox
