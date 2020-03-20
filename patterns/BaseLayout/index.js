import { Component } from 'react'

export default class BaseLayout extends Component {
  componentDidMount() {
    window.addEventListener('body:overflow', this.toggleBodyOverflow)
  }

  componentWillUnmount() {
    window.removeEventListener('body:overflow', this.toggleBodyOverflow)
  }

  toggleBodyOverflow = () => {
    document.querySelector('body').classList.toggle('body--no-overflow')
  }

  render() {
    const { children } = this.props

    return <div className="site-wrapper">{children}</div>
  }
}
