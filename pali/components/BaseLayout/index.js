import { Fragment } from 'react'
import './reset.styl'
import './fonts.styl'
import './general.styl'
import './variables.styl'

export default function BaseLayout({ children }) {
  return (
    <Fragment>
      <div className="site-wrapper">{children}</div>
    </Fragment>
  )
}
