/* eslint-disable indent */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Button } from '..'
import styles from './settings.scss'
import Axios from 'axios'
import { PopUp } from '../../components'
import { popUpData } from '../popUp/popUpData'

@inject('store')
@observer
class SettingsPrompt extends Component {
  constructor(props) {
    super(props)

    this.state = {
      settings: props.settings,
      popupVisible: false
    }
  }

  updateActivate (status) {
    const newSettings = this.state.settings
    newSettings.active = status

    Axios.put('/profile/settings', newSettings, { withCredentials: true }).then(() => {
      this.setState ({
        settings: newSettings
      })
    })
  }

  showPopup() {
    const { notification } = this.props.store

    if (this.state.settings.active == null) {
      notification.setContent(popUpData.messages.confirmDeactivate)

      notification.setActions([
        {
          ...popUpData.actions.confirmNegative,
          action: () => {
            this.updateActivate(Date.now())
            notification.close()
          }
        },
        {
          ...popUpData.actions.cancelNegative,
          action: notification.close
        }
      ])

      notification.setCanCloseWithClick(true)
    } else {
      this.updateActivate(null)
    }
  }

  render() {
    const { notification } = this.props.store

    return (
      <div className={ styles.settingsContainer }>
          <div className={ styles.settingsElement }>
            <p className={ styles.key }> Active </p>
            <div>
              <Button
                key={ 'button' }
                className={ styles.avatarUploadPopUpBtnsCancelButton }
                value={ this.state.settings.active == null ? 'Deactivate' : 'Activate' }
                inverted={ this.state.settings.active == null }
                onClick={ this.showPopup.bind(this) }
              />
            </div>
          </div>
        { this.state.popupVisible && (
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

export default withRouter(SettingsPrompt)
