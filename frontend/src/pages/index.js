import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { initStore } from '../stores'
import { Provider } from 'mobx-react'
import { popUpData } from '../components/popUp/popUpData'
import { onSnapshot } from 'mobx-state-tree'
import { PopUp } from '../components'
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
    this.store.profile.loginVerify()
    this.verifyCookies()

    this.state = {
      isNotificationVisible: this.store.notification.visible
    }

    onSnapshot(this.store.notification, (notification) => {
      if (notification.visible !== this.state.isNotificationVisible) {
        this.setState({
          isNotificationVisible: notification.visible
        })
      }
    })
  }

  verifyCookies() {
    const cookiesAcceptedAt = localStorage.getItem('cookiesAcceptedAt')

    // todo check date

    if (cookiesAcceptedAt)
      return

    this.store.notification.setContent(popUpData.messages.cookies)
    this.store.notification.setCustomClose(() => {
      localStorage.setItem('cookiesAcceptedAt', new Date().toString())
      self.isCookiesAccepted = true
    })
  }

  render () {
    return (
      <Provider store={this.store}>
        <div>
          { this.state.isNotificationVisible && (
              <PopUp content={{
                ...this.store.notification.getTitleAndDescriptionJSON(),
                close: () => this.store.notification.close()
              }}/>
          )}
          <Router>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/profile/:path' exact component={Profile} />
              <Route path='/profile' exact component={Profile} />
              <Route path='/404' exact component={Error} />
              <Route path='/500' exact component={() => <Error title={500} sub={'Internal server error'} />} />
              <Route path='/new-post' exact component={() => <Post new={true} />} />
              <Route path='/posts/:postUrl' exact component={Post} />
              <Route path='/login' exact component={Login} />
              <Route path='/register' exact component={Register} />
              <Route component={Error} />
            </Switch>
          </Router>
        </div>
      </Provider>
    )
  }
}

export default AppRouter
