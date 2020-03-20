import { Component } from 'react'

const OVERFLOW_CLASS = 'body--no-overflow'

export default class BaseLayout extends Component {
  componentDidMount() {
    window.addEventListener('body:overflow', this.handleBodyOverflow)
  }

  componentWillUnmount() {
    window.removeEventListener('body:overflow', this.handleBodyOverflow)
  }

  handleBodyOverflow = () => {
    const bodyElement = document.querySelector('body')
    const hasOverFlowClass = bodyElement.classList.contains(OVERFLOW_CLASS)

    if (hasOverFlowClass) {
      bodyElement.classList.remove(OVERFLOW_CLASS)
    } else {
      bodyElement.classList.add(OVERFLOW_CLASS)
    }
  }

  render() {
    const { children } = this.props

    return <div className="site-wrapper">{children}</div>
  }
}
