import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { initStore } from '../stores'
import { Provider } from 'mobx-react'
import Home from './home'
import Profile from './profile'
import Post from './post'
import Error from './error'
import Login from'./login'
import Register from'./register'

class AppRouter extends Component {
  constructor(props) {
    super(props)
    this.store = initStore(true)
  }

  render () {
    return (
      <Provider store={this.store}>
        <Router>
          <div>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/profile' exact component={Profile} />
              <Route path='/posts' exact component={Post} />
              <Route path='/posts/:postUrl' exact component={Post} />
              <Route path='/login' exact component={Login} />
              <Route path='/register' exact component={Register} />
              <Route component={Error} />
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default AppRouter
