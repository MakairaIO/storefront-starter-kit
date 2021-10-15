import React, { Component, useContext } from 'react'
import isEqual from 'lodash/isEqual'

/* First we will make a new context */
const GlobalDataContext = React.createContext()

/* Then create a provider Component */
class GlobalDataProvider extends Component {
  constructor(props) {
    super(props)

    const { children, ...initialState } = props

    this.state = {
      ...initialState,
      cart: {
        items: [],
        totalIncVat: 0,
        totalItemsCount: 0,
      },
    }
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

  async componentDidMount() {
    await this.fetchCart()

    this.updateLocalStorage()

    window.addEventListener('update:cart', this.handleUpdateCartEvent)
  }

  fetchCart = async () => {
    const response = await fetch(
      `${process.env.FAILOVER_URL}/public/flourshop/posbasket`,
      {
        credentials: 'include',
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    const cart = await response.json()

    this.updateCart(cart)
  }

  handleUpdateCartEvent = (event) => {
    const { cart } = event.detail

    this.updateCart(cart)
  }

  updateCart = (cart) => {
    const { items = [] } = cart

    const totalItemCount = items.reduce((totalQuantity, currentLineItem) => {
      return totalQuantity + currentLineItem.quantity
    }, 0)

    this.setState({
      cart: {
        ...cart,
        totalItemCount,
      },
    })
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
