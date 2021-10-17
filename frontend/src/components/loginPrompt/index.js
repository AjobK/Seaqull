import React, { Component } from 'react'
import Axios from 'axios'
import styles from './loginPrompt.scss'
import { Button, FormInput } from '../../components'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { popUpData } from '../popUp/popUpData'
import RecaptchaUtil from '../../util/recaptchaUtil'

@inject('store')
@observer
class LoginPrompt extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: null,
      password: null,
      remainingTimeInterval: null,
      remainingTime: null,
      loadingTimeout: false,
    }

    this.elId = {}
  }

  componentDidMount() {
    RecaptchaUtil.loadRecaptchaScript(this.props.store.defaultData.recaptchaSiteKey, () => {
      console.log('Script loaded!')
    })
  }

  componentWillUnmount() {
    RecaptchaUtil.unloadRecaptchaScript()
  }

  auth = (recaptchaToken) => {
    Axios.defaults.baseURL = this.props.store.defaultData.backendUrl

    const payload = {
      username: document.getElementById(this.elId.Username).value,
      password: document.getElementById(this.elId.Password).value,
      recaptcha: recaptchaToken
    }

    Axios.post('/login', payload, { withCredentials: true })
      .then((res) => {
        this.props.store.profile.setLoggedIn(true)
        this.props.store.profile.setProfileData(res.data.user)
        this.goToProfile(res.data.user.profile.display_name)
      })
      .catch((res) => {
        if (res.message === 'Network Error') {
          this.props.store.notification.setContent(popUpData.messages.networkError)

          return this.setState({
            username: ['No connection'],
            password: ['No connection'],
            loadingTimeout: false,
          })
        }

        const { errors, remainingTime } = res.response.data

        if (remainingTime) this.setRemainingTimeInterval(remainingTime)

        this.setState({
          username: errors || [],
          password: errors || [],
          loadingTimeout: false,
        })
      })
  }

  setRemainingTimeInterval = (remainingTime) => {
    if (this.remainingTimeInterval) clearInterval(this.remainingTimeInterval)

    this.setState({ remainingTime })

    this.remainingTimeInterval = setInterval(() => {
      let nextTime = this.state.remainingTime - 1

      if (this.state.remainingTime <= 1) {
        clearInterval(this.remainingTimeInterval)
        nextTime = null
      }

      this.setState({
        remainingTime: nextTime,
      })
    }, 1000)
  }

  goToProfile = (username) => {
    this.props.history.push('/profile/' + username)
  }

  onSubmit = (e) => {
    e.preventDefault()

    if (this.state.remainingTime && this.remainingTimeInterval) return

    this.setState({
      username: 'loading',
      password: 'loading',
      loadingTimeout: true,
    })

    RecaptchaUtil.executeRecaptcha(this.props.store.defaultData.recaptchaSiteKey)
      .then((token) => {
        this.auth(token)
      })
  }

  setElId = (item, id) => {
    this.elId[item.props.name] = id
  }

  render() {
    const { username, password, remainingTime, loadingTimeout } = this.state

    return (
      <div className={ [styles.prompt, this.props.className].join(' ') }>
        <div className={ styles.logo } />
        <p className={ styles.text }> Welcome back!</p>
        <div className={ styles.formWrapper }>
          <form onSubmit={ this.onSubmit } className={ styles.form }>
            <FormInput
              toolTipDirection={ 'bottom' }
              name={ 'Username' }
              errors={ username }
              className={ [styles.formGroup] }
              callBack={ this.setElId }
              type="text"
            />
            <FormInput
              toolTipDirection={ 'bottom' }
              name={ 'Password' }
              errors={ password }
              className={ [styles.formGroup] }
              callBack={ this.setElId }
              type="password"
            />
            <div to="/" className={ styles.submitWrapper }>
              <Button
                value={ 'Log In' }
                className={ styles.submit }
                disabled={ !!remainingTime || loadingTimeout }
              />
              {remainingTime && <p className={ styles.counter }>{`${remainingTime}s left`}</p>}
            </div>
          </form>
          <div className={ styles.image } />
        </div>
      </div>
    )
  }
}
export default withRouter(LoginPrompt)
