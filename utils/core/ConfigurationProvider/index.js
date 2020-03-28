import { Component, useContext } from 'react'

const ConfigurationContext = React.createContext()

class ConfigurationProvider extends Component {
  static defaultProps = { assetUrl: '' }

  // TODO: Implement height/width/quality handling once we are clear
  // about the Media-Handling to use
  getImageLink = (options = {}) => {
    const { source = '' } = options

    const { assetUrl } = this.props

    return assetUrl + '/' + source
  }

  render() {
    return (
      <ConfigurationContext.Provider
        value={{ getImageLink: this.getImageLink }}
      >
        {this.props.children}
      </ConfigurationContext.Provider>
    )
  }
}

function useConfiguration() {
  return useContext(ConfigurationContext)
}

export default ConfigurationContext
export { ConfigurationProvider, useConfiguration }
