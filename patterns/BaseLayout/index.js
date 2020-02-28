import { Fragment } from 'react'

export default function BaseLayout({ children }) {
  return (
    <Fragment>
      <div className="site-wrapper">{children}</div>
    </Fragment>
  )
}
