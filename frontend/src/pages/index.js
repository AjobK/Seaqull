import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { initStore } from '../stores'
import { Provider } from 'mobx-react'
import { GlobalNotification } from '../components'
import Home from './home'
import Profile from './profile'
import Post from './post'
import Error from './error'
import Login from './login'
import Register from './register'
import { Header } from '../layouts'

class AppRouter extends Component {
  constructor(props) {
    super(props)

    this.store = initStore(true)
    this.store.profile.loginVerify()
  }

  render () {
    return (
      <Provider store={ this.store }>
        <>
          <GlobalNotification />
          <Router>
            <>
              <Header />
              <Switch>
                <Route path='/' exact component={ Home } />
                <Route path='/profile' exact component={ Profile } />
                <Route path='/profile/:path' exact component={ Profile } />
                <Route path='/error' exact component={ Error } />
                <Route path='/new-post' exact component={ () => <Post new={ true } /> } />
                <Route path='/posts/:postUrl' exact component={ Post } />
                <Route path='/login' exact component={ Login } />
                <Route path='/register' exact component={ Register } />
                <Route component={ () => <Error title={ 404 } sub={ 'Page not found' } /> } />
              </Switch>
            </>
          </Router>
        </>
      </Provider>
    )
  }
}

export default AppRouter
