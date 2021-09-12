import React, { Component } from 'react'
import styles from './registerPrompt.scss'
import { inject, observer } from 'mobx-react'
import { Icon, FormInput, Button } from '../'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-google'

@inject('store')
@observer
class RegisterPrompt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      email: null,
      password: null,
      recaptcha: null,
      recaptchaToken: null,
    }

    this.elId = {}
  }

  componentDidMount() {
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this)
    this.verifyCallback = this.verifyCallback.bind(this)
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
      recaptcha: this.state.recaptchaToken,
    }

    Axios.post('/profile/register', payload, { withCredentials: true })
      .then((res) => {
        this.props.store.profile.loginVerify()
        this.props.store.user.fillUserData(res.data.user)
        this.goToProfile(res.data.user.user_name)
      })
      .catch((res) => {
        const { username, email, password, recaptcha } = res.response.data.errors

        this.setState({
          username: username || [],
          email: email || [],
          password: password || [],
          recaptcha: recaptcha || [],
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

    //checking if recaptcha is already loaded
    if (!this.captcha.state.ready) {
      this.state.recaptchaToken == null ? loadReCaptcha() : this.auth()
    } else {
      this.loadCaptchaOnSubmit()
    }
  }

  setElId = (item, id) => {
    this.elId[item.props.name] = id
  }

  loadCaptchaOnSubmit = () => {
    if (this.captcha) {
      this.captcha.reset()
      this.captcha.execute()
    }
    // setTimeout( () => {
    //   this.setState({
    //     user_name: null,
    //     email: null,
    //     password: null,
    //     recaptcha: null,
    //   })
    // }, 3000);
  }
  onLoadRecaptcha = () => {
    if (this.captcha) {
      this.captcha.reset()
      this.captcha.execute()
    }
    //   setTimeout( () => {
    //     this.setState({
    //       user_name: null,
    //       email: null,
    //       password: null,
    //       recaptcha: null,
    //     })
    // }, 3000);
  }

  verifyCallback = (recaptchaToken) => {
    this.setState({ recaptchaToken })
    this.auth()
  }

  render() {
    const { username, email, password, recaptcha } = this.state
    let buttonClass = Array.isArray(recaptcha) && recaptcha.length > 0 ? 'Try again...' : 'Sign Up'

    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
        <div className={styles.logo} />
        <p className={styles.text}>
          Join our community <Icon className={styles.textIcon} iconName={'Crow'} />
        </p>
        <div className={styles.formWrapper}>
          <form method="POST" className={styles.form} onSubmit={this.onSubmit}>
            <FormInput
              toolTipDirection={'bottom'}
              name={'Username'}
              errors={username}
              className={[styles.formGroup]}
              callBack={this.setElId}
            />
            <FormInput
              toolTipDirection={'bottom'}
              name={'Email'}
              errors={email}
              className={[styles.formGroup]}
              callBack={this.setElId}
            />
            <FormInput
              toolTipDirection={'bottom'}
              name={'Password'}
              errors={password}
              className={[styles.formGroup]}
              callBack={this.setElId}
              type="password"
            />
            <div to="/" className={styles.submitWrapper}>
              <Button value={buttonClass} className={styles.submit} />
              <ReCaptcha
                ref={(el) => {
                  this.captcha = el
                }}
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
          By proceeding I confirm that I have read and agree to the{' '}
          <a className={styles.textFooterLink} href="#">
            Terms of service
          </a>
        </p>
      </div>
    )
  }
}

export default withRouter(RegisterPrompt)
