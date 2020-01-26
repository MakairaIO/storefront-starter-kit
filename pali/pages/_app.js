import { Fragment } from 'react'
import App from 'next/app'
import '../pattern-library/pali.styl'
import { SVGSprite } from '../components'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <Fragment>
        <SVGSprite />

        <Component {...pageProps} />
      </Fragment>
    )
  }
}

export default MyApp
