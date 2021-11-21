import React, { Component, createRef } from 'react'
import Axios from 'axios'
import styles from './loginPrompt.scss'
import { Button, FormInput } from '../../components'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { popUpData } from '../popUp/popUpData'

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

    this.captchaRef = createRef()

    this.elId = {}
  }

  auth = (captchaToken) => {
    Axios.defaults.baseURL = this.props.store.defaultData.backendUrl

    const payload = {
      username: document.getElementById(this.elId.Username).value,
      password: document.getElementById(this.elId.Password).value,
      captcha: captchaToken
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

    this.captchaRef.current.execute()
  }

  setElId = (item, id) => {
    this.elId[item.props.name] = id
  }

  handleVerificationSuccess(token) {
    this.setState({
      username: 'loading',
      password: 'loading',
      loadingTimeout: true,
    })

    this.auth(token)
  }

  onCaptchaError = () => {
    const { notification } = this.props.store
    const { captchaError } = popUpData.messages

    notification.setContent(captchaError)
  }

  render() {
    const { username, password, remainingTime, loadingTimeout } = this.state
    const { NODE_ENV, HCAPTCHA_DEV_SITE_KEY, HCAPTCHA_PROD_SITE_KEY } = process.env

    const siteKey = NODE_ENV === 'development'
      ? HCAPTCHA_DEV_SITE_KEY
      : HCAPTCHA_PROD_SITE_KEY

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
            <HCaptcha
              sitekey={ siteKey }
              size={ 'invisible' }
              onVerify={ (token, ekey) => this.handleVerificationSuccess(token, ekey) }
              onError={ this.onCaptchaError }
              ref={ this.captchaRef }
            />
          </form>
          <div className={ styles.image } />
        </div>
      </div>
    )
  }
}
export default withRouter(LoginPrompt)
