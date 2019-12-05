import { Component, useContext } from 'react'
import isEqual from 'lodash/isEqual'

/* First we will make a new context */
const GlobalDataContext = React.createContext()

/* Then create a provider Component */
class GlobalDataProvider extends Component {
  constructor(props) {
    super(props)

    const { menuData, pageData } = props

    this.state = { menuData, pageData }
  }

  static getDerivedStateFromProps(props, state) {
    // Update Page Data when needed (e.g. navigating client-side)
    if (!isEqual(props.pageData, state.pageData)) {
      return {
        pageData: props.pageData,
        constraints: props.constraints,
      }
    }

    return {}
  }

  componentDidMount() {
    this.updateLocalStorage()
  }

  updateLocalStorage = () => {
    // We stringify our object here, beause the JSON is quite big and
    // parsing big JSON-Strings is more efficient than parsing big
    // Object-literals
    // see: https://v8.dev/blog/cost-of-javascript-2019#json
    localStorage.setItem('menuData', JSON.stringify(this.state.menuData))
  }

  render() {
    return (
      <GlobalDataContext.Provider value={this.state}>
        {this.props.children}
      </GlobalDataContext.Provider>
    )
  }
}

function useGlobalData() {
  return useContext(GlobalDataContext)
}

export default GlobalDataContext
export { GlobalDataProvider, useGlobalData }
