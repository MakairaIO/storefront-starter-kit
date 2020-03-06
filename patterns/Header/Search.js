import { Button, Icon } from '..'

export default function Search() {
  return (
    <>
      <label className="header__search">
        <Icon symbol="search" />

        <input
          type="text"
          name=""
          // value=""
          required="required"
          className="header__search-input"
        />
      </label>

      <Button icon="search" className="header__action header__action--search" />
    </>
  )
}
