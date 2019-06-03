import React, { Component } from 'react'
import styles from './registerPrompt.scss'
import Button from '../button'
import { inject, observer } from 'mobx-react'
import { Icon, FormInput } from '../../components'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-google'

@inject('store') @observer
class RegisterPrompt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      email: null,
      password: null,
      recaptcha: null,
      recaptchaToken: null
    }

    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this)
    this.verifyCallback = this.verifyCallback.bind(this)
    this.elId = {}
  }

  auth = () => {
    Axios.defaults.baseURL = this.props.store.defaultData.backendUrl

    const payload = {
      username: document.getElementById(this.elId.Username).value,
      email: document.getElementById(this.elId.Email).value,
      password: document.getElementById(this.elId.Password).value,
      recaptcha: this.state.recaptchaToken
    }

    Axios.post('/register', payload)
    .then(res => {
      Axios.get('/user', {
        mode:'cors',
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type':'application/json', 'Authorization': `Bearer ${res.data.token}` }
      })
      .then(user => {
        localStorage.setItem('user', JSON.stringify(user.data.user))

        return user.data.user
      })
      .then(user => {
          this.props.store.user.fillUserData(user)
          this.goToProfile()
      })
    })
    .catch(res => {
      const { username, email, password, recaptcha } = res.response.data.errors

      this.setState({
        username: username || [],
        email: email || [],
        password: password || [],
        recaptcha: recaptcha || []
      })
    })
  }

  goToProfile = () => {
    this.props.history.push('/profile')
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({
      username: 'loading',
      email: 'loading',
      password: 'loading'
    })
    this.state.recaptcha == null ? this.onLoadRecaptcha() : this.auth()
  }

  setElId = (item, id) => {
    this.elId[item.props.name] = id
  }

  onLoadRecaptcha = () => {
    loadReCaptcha()
    
    if (this.captcha) {
      this.captcha.reset()
      this.captcha.execute()
    }
  }
  
  verifyCallback = (recaptchaToken) => {
    this.setState({ recaptchaToken })
    this.auth()
  }

  render() {
    const { username, email, password, recaptcha } = this.state
    let buttonClass = typeof recaptcha == 'array' && recaptcha.length > 0 ? 'Try again' : 'Register'

    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
        <div className={styles.logo} />
        <p className={styles.text}>Join our community <Icon className={styles.textIcon} iconName={'Crow'} /></p>
        <div className={styles.formWrapper}>
          <form method='POST' className={styles.form} onSubmit={this.onSubmit}>
            <FormInput name={'Username'} errors={username} className={[styles.formGroup]} callBack={this.setElId}/>
            <FormInput name={'Email'} errors={email} className={[styles.formGroup]} callBack={this.setElId}/>
            <FormInput name={'Password'} errors={password} className={[styles.formGroup]} callBack={this.setElId} password/>
            <div to='/' className={styles.submitWrapper}>
              <Button value={buttonClass} className={styles.submit} />
              <ReCaptcha
                ref={(el) => {this.captcha = el}}
                size='invisible'
                render='explicit'
                sitekey='6Lev1KUUAAAAAKBHldTqZdeR1XdZDLQiOOgMXJ-S'
                onloadCallback={this.onLoadRecaptcha}
                verifyCallback={this.verifyCallback}
              />
            </div>
          </form>
          <div className={styles.image} />
        </div>
        <p className={styles.textFooter}>
          By proceeding I confirm that I have read and agree to the <a className={styles.textFooterLink}href='#'>Terms of service</a>
        </p>
      </div>
    )
  }
}

export default withRouter(RegisterPrompt)
