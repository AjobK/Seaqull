import React, { Component } from 'react'
import styles from './registerPrompt.scss'
import Button from '../button'
import { inject, observer } from 'mobx-react'
import { Icon, FormInput } from '../../components'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import { loadReCaptcha } from 'react-recaptcha-google'
import { ReCaptcha } from 'react-recaptcha-google'

@inject('store') @observer
class RegisterPrompt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      email: null,
      password: null,
      recaptcha: null
    }

    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this)
    this.verifyCallback = this.verifyCallback.bind(this)
    this.elId = {}
  }
  componentDidMount = () => {
    if (this.captchaDemo) {
        console.log("started, just a second...")
        this.captchaDemo.reset();
        this.captchaDemo.execute();
    }
  }
  onLoadRecaptcha = () => {
      if (this.captchaDemo) {
          this.captchaDemo.reset();
          this.captchaDemo.execute();
      }
  }
  verifyCallback = (recaptchaToken) => {
    this.setState({
      recaptcha: recaptchaToken
    })
  }

  componentDidMount = () => {
    loadReCaptcha();
  }

  auth = () => {
    Axios.defaults.baseURL = 'http://localhost:8000/api';

    const payload = {
      name: document.getElementById(this.elId.Username).value,
      email: document.getElementById(this.elId.Email).value,
      password: document.getElementById(this.elId.Password).value,
      recaptcha: this.state.recaptcha
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
      const { name, email, password } = res.response.data.errors
      this.setState({
        name: name || [],
        email: email || [],
        password: password || [],
        recaptcha: recaptcha || [],
      })
    })
  }

  goToProfile = () => {
    this.props.history.push('/profile')
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({
      name: 'loading',
      email: 'loading',
      password: 'loading'
    })
    this.state.recaptcha == null ? null : this.auth()
  }

  setElId = (item, id) => {
    this.elId[item.props.name] = id
  }

  render() {
    const { name, email, password } = this.state

    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
        <div className={styles.logo} />
        <p className={styles.text}>Join our community <Icon className={styles.textIcon} iconName={'Crow'} /></p>
        <div className={styles.formWrapper}>
          <form method='POST' className={styles.form} onSubmit={this.onSubmit}>
            <FormInput name={'Username'} errors={name} className={[styles.formGroup]} callBack={this.setElId}/>
            <FormInput name={'Email'} errors={email} className={[styles.formGroup]} callBack={this.setElId}/>
            <FormInput name={'Password'} errors={password} className={[styles.formGroup]} callBack={this.setElId} password/>
            <div to='/' className={styles.submitWrapper}>
              <Button value={'Register'} className={styles.submit} />
              <ReCaptcha
                ref={(el) => {this.captchaDemo = el;}}
                size="invisible"
                render="explicit"
                sitekey="6Lev1KUUAAAAAKBHldTqZdeR1XdZDLQiOOgMXJ-S"
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
