import React, { Component } from 'react'
import Axios from 'axios'
import styles from './loginPrompt.scss'
import { Button, FormInput } from '../../components'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-google'

@inject('store') @observer
class LoginPrompt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: null,
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
      user_name: document.getElementById(this.elId.Username).value,
      password: document.getElementById(this.elId.Password).value,
      recaptcha: this.state.recaptchaToken
    }

    Axios.post('/login', payload)
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
      const { error } = res.response.data

      this.setState({
        user_name: error || [],
        password: error || [],
        recaptcha: recaptcha || [],
        recaptchaToken: null
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
      password: 'loading'
    })
    //checking if recaptcha is already loaded
    if(!(this.captcha.state.ready)){
      this.state.recaptchaToken == null ? loadReCaptcha() : this.auth()
    }else{
      this.loadCaptchaOnSubmit()
    }
  }

  loadCaptchaOnSubmit = () =>{
    if (this.captcha) {
      this.captcha.reset()
      this.captcha.execute()
    }
    setTimeout( () => { 
      this.setState({
        user_name: null,
        email: null,
        password: null,
        recaptcha: null,
      })
  }, 3000);
  }

  onLoadRecaptcha = () => {
    if (this.captcha) {
      this.captcha.reset()
      this.captcha.execute()
    }
    setTimeout( () => { 
      this.setState({
        user_name: null,
        email: null,
        password: null,
        recaptcha: null,
      })
  }, 3000);
  }
  
  verifyCallback = (recaptchaToken) => {
    this.setState({ recaptchaToken })
    this.auth()
  }

  setElId = (item, id) => {
    this.elId[item.props.name] = id
  }

  render() {
    const { user_name, password, recaptcha } = this.state
    let buttonClass = Array.isArray(recaptcha) && recaptcha.length > 0 ? 'Try again...' : 'Register'

    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
        <div className={styles.logo} />
        <p className={styles.text}> Welcome back! </p>
        <div className={styles.formWrapper}>
          <form onSubmit={this.onSubmit} className={styles.form}>
            <FormInput name={'Username'} errors={user_name} className={[styles.formGroup]} callBack={this.setElId}/>
            <FormInput name={'Password'} errors={password} className={[styles.formGroup]} callBack={this.setElId} password/>
            <div to='/' className={styles.submit_wrapper}>
              <Button value='Log In' className={styles.submit} />
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
      </div>
    )
  }
}

export default withRouter(LoginPrompt)
