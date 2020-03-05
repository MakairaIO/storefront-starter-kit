import { Component, useContext } from 'react'

const ConfigurationContext = React.createContext()

class ConfigurationProvider extends Component {
  static defaultProps = { assetUrl: '' }

  render() {
    return (
      <ConfigurationContext.Provider value={{ assetUrl: this.props.assetUrl }}>
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
