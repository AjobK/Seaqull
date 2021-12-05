import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

@inject('store')
@observer
class SettingsPrompt extends Component {
  constructor(props) {
    super(props)

    const settingsList = []
    const settingsJson = props.settings

    for (let key in settingsJson) {
      console.log(settingsJson[key])
      const newObject = {
        'key': key,
        'value': settingsJson[key]
      }
      settingsList.push(newObject)
    }

    this.state = {
      settings: settingsList
    }
  }

  render() {
    return (
      <div>
        { this.state.settings.map(function(object, i) {
          return (
            <>
              <div>
                <p key={ 'key' + i }> {object.key} </p>
                <p key={ 'value' + i }> {object.value} </p>
              </div>
            </>
          )
        })}
      </div>
    )
  }
}

export default withRouter(SettingsPrompt)
