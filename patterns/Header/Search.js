import { Button, Icon } from '..'

export default function Search(props) {
  const {
    searchPhrase,
    changeSearchPhrase,
    submitForm,
    activateMobileSearch,
  } = props

  return (
    <>
      <form className="header__search" onSubmit={submitForm}>
        <label>
          <Icon symbol="search" />

          <input
            type="text"
            name="searchPhrase"
            value={searchPhrase}
            onChange={changeSearchPhrase}
            required="required"
            className="header__search-input"
          />
        </label>
      </form>

      <Button
        variant="icon-only"
        icon="search"
        className="header__action header__action--search"
        onClick={activateMobileSearch}
      />
    </>
  )
}
