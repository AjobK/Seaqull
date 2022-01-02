import React, { Component, createRef } from 'react'
import styles from './registerPrompt.scss'
import { inject, observer } from 'mobx-react'
import { Icon, FormInput, Button } from '../'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { popUpData } from '../popUp/popUpData'

@inject('store')
@observer
class RegisterPrompt extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: null,
      email: null,
      password: null,
      generalError: null
    }

    this.captchaRef = createRef()

    this.elId = {}
  }

  auth = (captchaToken) => {
    this.setState({
      username: 'loading',
      email: 'loading',
      password: 'loading',
    })

    Axios.defaults.baseURL = this.props.store.defaultData.backendUrl

    const payload = {
      username: document.getElementById(this.elId.Username).value,
      email: document.getElementById(this.elId.Email).value,
      password: document.getElementById(this.elId.Password).value,
      captcha: captchaToken,
    }

    Axios.post('/profile/register', payload, { withCredentials: true })
      .then((res) => {
        this.props.store.profile.loginVerify()
        this.props.store.profile.setProfileData(res.data.user)
        this.goToProfile(res.data.user.profile.display_name)
      })
      .catch((res) => {
        this.handleError(res?.response?.data?.message)
      })
  }

  goToProfile = (username) => {
    this.props.history.push('/profile/' + username)
  }

  onSubmit = (e) => {
    e.preventDefault()

    this.captchaRef.current.execute()
  }

  handleVerificationSuccess(token) {
    this.setState({
      username: 'loading',
      email: 'loading',
      password: 'loading',
    })

    this.auth(token)
  }

  setElId = (item, id) => {
    this.elId[item.props.name] = id
  }

  getError = (credentialError) => {
    const { generalError } = this.state

    return generalError?.length > 0 ? generalError : credentialError
  }

  onCaptchaError = () => {
    this.props.store.notification.setContent(popUpData.messages.captchaError)
  }

  handleError = (msg) => {
    const errors = {
      username: [],
      email: [],
      password: [],
      generalError: [],
    }

    for (const elem of msg) {
      const error = elem.toLowerCase()

      let errorIsAdded = false

      Object.keys(errors).forEach((key) => {
        if (error.includes(key)) {
          errors[key].push(elem)
          errorIsAdded = true
        }
      })

      if (!errorIsAdded) errors.generalError.push(elem)
    }

    this.setState({
      username: errors.username,
      email: errors.email,
      password: errors.password,
      generalError: errors.generalError,
    })
  }

  render() {
    const { username, email, password } = this.state

    return (
      <div className={ [styles.prompt, this.props.className].join(' ') }>
        <div className={ styles.logo } />
        <p className={ styles.text }>
          Join our community <Icon className={ styles.textIcon } iconName={ 'Crow' } />
        </p>
        <div className={ styles.formWrapper }>
          <form method="POST" className={ styles.form } onSubmit={ this.onSubmit }>
            <FormInput
              toolTipDirection={ 'bottom' }
              name={ 'Username' }
              errors={ this.getError(username) }
              className={ [styles.formGroup] }
              callBack={ this.setElId }
            />
            <FormInput
              toolTipDirection={ 'bottom' }
              name={ 'Email' }
              errors={ this.getError(email) }
              className={ [styles.formGroup] }
              callBack={ this.setElId }
            />
            <FormInput
              toolTipDirection={ 'bottom' }
              name={ 'Password' }
              errors={ this.getError(password) }
              className={ [styles.formGroup] }
              callBack={ this.setElId }
              type="password"
            />
            <div to="/" className={ styles.submitWrapper }>
              <Button value={ 'Sign Up' } className={ styles.submit } />
            </div>
            <HCaptcha
              sitekey={ process.env.NODE_ENV === 'development'
                ? process.env.HCAPTCHA_DEV_SITE_KEY
                : process.env.HCAPTCHA_PROD_SITE_KEY }
              size={ 'invisible' }
              onVerify={ (token, ekey) => this.handleVerificationSuccess(token, ekey) }
              onError={ this.onCaptchaError }
              ref={ this.captchaRef }
            />
          </form>
          <div className={ styles.image } />
        </div>
        <p className={ styles.textFooter }>
          By proceeding I confirm that I have read and agree to the{' '}
          <a className={ styles.textFooterLink } href="#">
            Terms of service
          </a>
        </p>
      </div>
    )
  }
}

export default withRouter(RegisterPrompt)
