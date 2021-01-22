import React, { Component, useContext } from 'react'
import isEqual from 'lodash/isEqual'
import { Matomo, Makaira } from '../..'

/* First we will make a new context */
const GlobalDataContext = React.createContext()

/* Then create a provider Component */
class GlobalDataProvider extends Component {
  constructor(props) {
    super(props)

    const { children, ...initialState } = props

    this.state = initialState
  }

  static getDerivedStateFromProps(props, state) {
    // Update State when needed (e.g. filtering, paginating, etc)
    if (
      !isEqual(props.pageData, state.pageData) ||
      !isEqual(props.searchResult, state.searchResult) ||
      !isEqual(props.params, state.params)
    ) {
      // We don't need to update menuData though
      const { children, menuData, ...updatedState } = props

      return updatedState
    }

    // No updates
    return null
  }

  componentDidMount() {
    this.initAbTesting()
    this.updateLocalStorage()
  }

  initAbTesting = () => {
    const experiments =
      this.state.pageData?.experiments ?? this.state.searchResult?.experiments

    Matomo.init()
    Matomo.enterAbTest({ experiments })
    Makaira.setAbTestCookie({ experiments })
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
