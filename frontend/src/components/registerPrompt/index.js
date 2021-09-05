import React, { Component } from 'react'
import styles from './registerPrompt.scss'
import { inject, observer } from 'mobx-react'
import { Icon, FormInput, Button } from '../'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import ReCAPTCHA from 'react-google-recaptcha'

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

    this.recaptchaRef = React.createRef()
    this.onChange = this.onChange.bind(this)
    this.elId = {}
  }

  auth = () => {
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
      recaptcha: this.state.recaptchaToken
    }

    Axios.post('/profile/register', payload, {withCredentials: true})
    .then(res => {
      this.props.store.profile.loginVerify()
      this.props.store.user.fillUserData(res.data.user)
      this.goToProfile(res.data.user.user_name)
    })
    .catch(res => {
      const { username, email, password } = res.response.data.errors

      this.setState({
        username: username || [],
        email: email || [],
        password: password || [],
        loadingTimeout: false
      })
    })
  }

  goToProfile = (username) => {
    this.props.history.push('/profile/' + username)
  }

  setElId = (item, id) => {
    this.elId[item.props.name] = id
  }
  
  onChange = (recaptchaToken) => {
    this.setState( { recaptchaToken } )
    this.auth()
  }

  onSubmit = (e) => {
    e.preventDefault()

    if (this.state.remainingTime && this.remainingTimeInterval) return

    this.setState({
      username: 'loading',
      password: 'loading',
      email: 'loading',
      loadingTimeout: true
    })

    if(!(this.state.loadingTimeout)){
      this.recaptchaRef.current.reset()
      this.recaptchaRef.current.execute()
    }
  }

  render() {
    const { username, email, password, recaptcha } = this.state
    let buttonClass = Array.isArray(recaptcha) && recaptcha.length > 0 ? 'Try again...' : 'Sign Up'

    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
        <div className={styles.logo} />
        <p className={styles.text}>Join our community <Icon className={styles.textIcon} iconName={'Crow'} /></p>
        <div className={styles.formWrapper}>
          <form onSubmit={this.onSubmit} className={styles.form}>
            <FormInput name={'Username'} errors={username} className={[styles.formGroup]} callBack={this.setElId}/>
            <FormInput name={'Email'} errors={email} className={[styles.formGroup]} callBack={this.setElId}/>
            <FormInput name={'Password'} errors={password} className={[styles.formGroup]} callBack={this.setElId} type="password"/>
            <div to='/' className={styles.submitWrapper}>
              <Button value={buttonClass} className={styles.submit} />
              { <ReCAPTCHA 
              ref={this.recaptchaRef} 
              sitekey='6Lev1KUUAAAAAKBHldTqZdeR1XdZDLQiOOgMXJ-S' 
              size='invisible' 
              badge='bottomright'
              onChange={this.onChange}
              hl="en" />
              }
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
