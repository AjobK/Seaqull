import React, { Component } from 'react'
import styles from './registerPrompt.scss'
import { inject, observer } from 'mobx-react'
import { Icon, FormInput, Button } from '../'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import RecaptchaUtil from '../../util/recaptchaUtil'

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

    this.elId = {}
  }

  componentDidMount() {
    RecaptchaUtil.loadRecaptchaScript(this.props.store.defaultData.recaptchaSiteKey, () => {
      console.log('Script loaded!')
    })
  }

  auth = (recaptchaToken) => {
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
      recaptcha: recaptchaToken,
    }

    Axios.post('/profile/register', payload, { withCredentials: true })
      .then((res) => {
        this.props.store.profile.loginVerify()
        this.props.store.profile.setProfileData(res.data.user)
        this.goToProfile(res.data.user.profile.display_name)
      })
      .catch((res) => {
        const { username, email, password, recaptcha } = res.response.data.errors

        this.setState({
          username: username || [],
          email: email || [],
          password: password || [],
          generalError: recaptcha || [],
          recaptchaToken: null,
        })
      })
  }

  goToProfile = (username) => {
    this.props.history.push('/profile/' + username)
  }

  onSubmit = (e) => {
    e.preventDefault()

    this.setState({
      username: 'loading',
      email: 'loading',
      password: 'loading',
    })

    RecaptchaUtil.executeRecaptcha(this.props.store.defaultData.recaptchaSiteKey)
      .then((token) => {
        this.auth(token)
      })
  }

  setElId = (item, id) => {
    this.elId[item.props.name] = id
  }

  getError = (credentialError) => {
    const generalError = this.state.generalError

    return generalError?.length > 0 ? generalError : credentialError
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
