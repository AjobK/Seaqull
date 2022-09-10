import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
class GuardedRoute extends Component {
  constructor(props) {
    super(props)
  }

  getToBeRoutedComponent = (Component, redirect) => {
    return this.props.store.profile.loggedIn
      ? <Component />
      : <Redirect to={ redirect } />
  }

  render() {
    const { component: Component, path, redirect } = this.props

    return (
      <Route path={ path } exact component={ () => this.getToBeRoutedComponent(Component, redirect) } />
    )
  }
}

export default GuardedRoute
