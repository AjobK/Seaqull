import React, { Component } from 'react'
import styles from './registerPrompt.scss'
import Button from '../button'
import { inject, observer } from 'mobx-react'
import { Icon, FormInput } from '../../components'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import ReCAPTCHA from "react-google-recaptcha"

@inject('store') @observer
class RegisterPrompt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: null,
      email: null,
      password: null,
      recaptchaToken: null,
      recaptcha: null,
      loadingTimeout: false
    }

    window.recaptchaOptions = {
      lang: 'en',
      useRecaptchaNet: true,
      removeOnUnmount: true,
    }

    this.recaptchaRef = React.createRef()
    this.onChange = this.onChange.bind(this)
    this.elId = {}
  }

  componentDidMount = () => { 
    Array.prototype.slice.call(document.getElementsByTagName('IFRAME')).forEach(element => {
      if (element.src.indexOf('www.google.com/recaptcha') > -1 && element.parentNode) {
        element.parentNode.removeChild(element)
      }
    })
  }

  auth = () => {
    Axios.defaults.baseURL = this.props.store.defaultData.backendUrl
    console.log(document.getElementById(this.elId.Username).value)

    const payload = {
      user_name: document.getElementById(this.elId.Username).value,
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
        localStorage.setItem('token', res.data.token)
        return user.data.user
      })
      .then(user => {
        this.props.store.user.fillUserData(user)
        this.goToProfile()
      })
    })
    .catch(res => {
      const { user_name, email, password } = res.response.data.errors
      
      this.setState({
        user_name: user_name || [],
        email: email || [],
        password: password || [],
        loadingTimeout: false
      })
    })
  }

  goToProfile = () => {
    this.props.history.push('/profile')
  }

  onSubmit = (e) => {
    e.preventDefault()

    this.setState({
      user_name: 'loading',
      email: 'loading',
      password: 'loading',
      loadingTimeout: true
    })
    
    if(!(this.state.loadingTimeout)){
      this.recaptchaRef.current.reset()
      this.recaptchaRef.current.execute()
    }  
  }

  setElId = (item, id) => {
    this.elId[item.props.name] = id
  }

  onChange = (recaptchaToken) => {
    this.setState({recaptchaToken})
    this.auth()
  }

  render() {
    const { user_name, email, password, recaptcha, loadingTimeout } = this.state
    let buttonClass = Array.isArray(recaptcha) && recaptcha.length > 0 ? 'Try again...' : 'Register'

    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
        <div className={styles.logo} />
        <p className={styles.text}>Join our community <Icon className={styles.textIcon} iconName={'Crow'} /></p>
        <div className={styles.formWrapper}>
          <form method='POST' className={styles.form} onSubmit={this.onSubmit}>
            <FormInput name={'Username'} errors={user_name} className={[styles.formGroup]} callBack={this.setElId}/>
            <FormInput name={'Email'} errors={email} className={[styles.formGroup]} callBack={this.setElId}/>
            <FormInput name={'Password'} errors={password} className={[styles.formGroup]} callBack={this.setElId} password/>
            <div to='/' className={styles.submitWrapper}>
              <Button value={buttonClass} className={styles.submit}  disabled={loadingTimeout} />
              <ReCAPTCHA ref={this.recaptchaRef} sitekey="6Lev1KUUAAAAAKBHldTqZdeR1XdZDLQiOOgMXJ-S" size="invisible" onChange={this.onChange}/>
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