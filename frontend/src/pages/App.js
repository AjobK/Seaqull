import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import { initStore } from '../stores'

require('dotenv').config()

class App extends Component {
  componentDidMount() {
    this.store = initStore(true)
  }

  render() {
    return (
      <Provider store={this.store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
