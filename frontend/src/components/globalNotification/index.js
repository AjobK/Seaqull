import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { onSnapshot } from 'mobx-state-tree'
import { PopUp } from '../../components'
import { popUpData } from '../popUp/popUpData'

@inject('store') @observer
class GlobalNotification extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isNotificationVisible: this.props.store.notification.visible
    }
  }

  componentDidMount = () => {
    this.initNotificationListener()

    this.verifyCookies()
  }

  initNotificationListener = () => {
    onSnapshot(this.props.store.notification, (notification) => {
      if (notification.visible !== this.state.isNotificationVisible) {
        this.setState({
          isNotificationVisible: notification.visible
        })
      }
    })
  }

  verifyCookies = () => {
    const { notification } = this.props.store

    const cookiesAcceptedAt = localStorage.getItem('cookiesAcceptedAt')

    const SEVEN_DAYS = 60 * 60 * 1000 * 24 * 7

    if (cookiesAcceptedAt) {
      const parsedCookiesDate = Date.parse(cookiesAcceptedAt)

      if (new Date() - SEVEN_DAYS >= parsedCookiesDate || !parsedCookiesDate) {
        localStorage.removeItem('cookiesAcceptedAt')
      } else {
        return
      }
    }

    notification.setContent(popUpData.messages.cookies)

    notification.setActions([
      {
        ...popUpData.actions.confirmWithText,
        action: notification.close()
      }
    ])

    notification.setCanCloseWithClick(false)

    notification.setCustomClose(() => {
      localStorage.setItem('cookiesAcceptedAt', new Date().toString())
    })
  }

  render() {
    const { notification } = this.props.store

    return (
      <div>
        { this.state.isNotificationVisible && (
          <PopUp content={ {
            ...notification.getContentJSON(),
            actions: notification.actionsData,
            close: () => notification.close(),
            canCloseWithClick: notification.canCloseWithClick
          } }/>
        )}
      </div>
    )
  }
}

export default GlobalNotification
