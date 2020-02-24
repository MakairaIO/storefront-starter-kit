import { Component } from 'react'

class SVGSprite extends Component {
  state = {
    svgData: '',
  }

  async componentDidMount() {
    const response = await fetch('/static/dist/icons.svg')
    const svgData = await response.text()

    this.setState({ svgData })
  }

  render() {
    return (
      <div
        id="svg-wrapper"
        dangerouslySetInnerHTML={{ __html: this.state.svgData }}
      />
    )
  }
}

export default SVGSprite
