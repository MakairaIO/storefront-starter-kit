/* eslint-disable */
import { useGlobalData, useTranslation } from '../../../utils'
import { ConditionalLink, Button } from '../..'
import classNames from 'classnames'

export default function FirstLevelNavigationItem(props) {
  const { language } = useTranslation()
  const {
    uuid,
    text = {},
    link = {},
    findMenuToShow = () => {},
    showMobileNavigation = () => {},
    // showedMenu = {},
    css = '',
  } = props

  const globalData = useGlobalData()

  let breadCrumbData =
    globalData?.pageData?.data?.self?.navigation?.breadcrumb || []

  const active = breadCrumbData?.[0]?.text === text[language]

  const activeHeadCategory = classNames('desktop-navigation__item-link', {
    ['active-headCategory']: active,
  })

  // useEffect(() => {
  //   const { uuid } = showedMenu
  //   if (uuid) {
  //     const navigationItems = document.getElementsByClassName(
  //       'desktop-navigation__item-link'
  //     )
  //     Array.from(navigationItems).forEach(function (nav) {
  //       if (nav.id === uuid) {
  //         nav.classList.add('desktop-navigation__item-link--hover')
  //       } else {
  //         nav.classList.remove('desktop-navigation__item-link--hover')
  //       }
  //     })
  //   }
  // }, [showedMenu])

  return (
    <li
      className="desktop-navigation__item"
      onMouseEnter={() => {
        findMenuToShow(props)
        showMobileNavigation(true, props)
      }}
    >
      {css === 'sign_up' && (
        <Button
          href={link[language]}
          fallbackElement="span"
          variant="primary"
          iconPosition="left"
          className="hs-cta-trigger-button hs-cta-trigger-button-75343025873"
        >
          {text[language]}
        </Button>
      )}
      {css !== 'sign_up' && (
        <ConditionalLink
          id={uuid}
          href={link[language]}
          className={activeHeadCategory}
          fallbackElement="span"
        >
          {text[language]}
        </ConditionalLink>
      )}
    </li>
  )
}
