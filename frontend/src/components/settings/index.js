import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Button } from '..'
import styles from './settings.scss'

@inject('store')
@observer
class SettingsPrompt extends Component {
  constructor(props) {
    super(props)

    const settingsList = []
    const settingsJson = props.settings

    for (let key in settingsJson) {
      if (key != 'id') {
        const newObject = {
          'key': key,
          'value': settingsJson[key]
        }
        settingsList.push(newObject)
      }
    }

    this.state = {
      settings: settingsList
    }
  }

  updateSettings (o) {
    console.log(o)
    /*const newSettings = this.state.settings
    newSettings[o.key] = o.value

    this.setState ({
      'settings': newSettings
    })
    console.log(o)*/
  }

  render() {
    return (
      <div>
        { this.state.settings.map((object, i) => {
          return (
            <div key={ i }>
              <p key={ 'key' + i }> {object.key} </p>
              <p key={ 'value' + i }> {object.value} </p>

              <Button
                key={ 'button' + i }
                className={ styles.avatarUploadPopUpBtnsCancelButton }
                value={ object.value ? 'Deactivate' : 'Activate' }
                inverted={ !object.value }
                onClick={ this.updateSettings.bind(this) }
              />
            </div>
          )
        })}
      </div>
    )
  }
}

export default withRouter(SettingsPrompt)
