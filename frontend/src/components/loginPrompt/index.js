import React, { Component } from 'react'
import Axios from 'axios'
import styles from './loginPrompt.scss'
import { Button, FormInput } from '../../components'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'

@inject('store') @observer
class LoginPrompt extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: null,
      password: null,
      remainingTimeInterval: null,
      remainingTime: null,
      recaptchaToken: null,
      recaptcha: null,
      loadingTimeout: false
    }

    window.recaptchaOptions = {
      lang: 'en',
      useRecaptchaNet: true,
      removeOnUnmount: true
    }

    this.recaptchaRef = React.createRef()
    this.onChange = this.onChange.bind(this)
    this.elId = {}
  }

  componentDidMount = () => {
    this.clearCaptcha()
  }

  componentWillUnmount = () => {
    this.clearCaptcha()
  }

  clearCaptcha = () => {
    Array.prototype.slice.call(document.getElementsByTagName('IFRAME')).forEach(element => {
      if (element.src.indexOf('www.google.com/recaptcha') > -1 && element.parentNode) {
        element.parentNode.removeChild(element)
      }
    })
  }

  auth = () => {
    Axios.defaults.baseURL = this.props.store.defaultData.backendUrl

    const payload = {
      username: document.getElementById(this.elId.Username).value,
      password: document.getElementById(this.elId.Password).value,
      recaptcha: this.state.recaptchaToken
    }

    Axios.post('/login', payload, {withCredentials: true})
    .then(res => {
      this.props.store.user.fillUserData(res.data.user);
      this.goToProfile(res.data.user.user_name)
    })
    .catch(res => {
      const { error, remainingTime } = res.response.data

      if (remainingTime) this.setRemainingTimeInterval(remainingTime)

      this.setState({
        username: error || [],
        password: error || [],
        loadingTimeout: false
      })
    })
  }

  setRemainingTimeInterval = (remainingTime) => {
    if (this.remainingTimeInterval) clearInterval(this.remainingTimeInterval)

    this.setState({ remainingTime })

    this.remainingTimeInterval = setInterval(() => {
      let nextTime = this.state.remainingTime-1

      if (this.state.remainingTime <= 1) {
        clearInterval(this.remainingTimeInterval)
        nextTime = null
      }
      this.setState({
        remainingTime: nextTime
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
      loadingTimeout: true
    })
    if(!(this.state.loadingTimeout)){
      // this.recaptchaRef.current.reset()
      // this.recaptchaRef.current.execute()
    }
  }

  setElId = (item, id) => {
    this.elId[item.props.name] = id
  }

  onChange = (recaptchaToken) => {
    this.setState( { recaptchaToken } )
    this.auth()
  }

  render() {
    const { username, password, remainingTime,recaptcha, loadingTimeout } = this.state
    let buttonClass = Array.isArray(recaptcha) && recaptcha.length > 0 ? 'Try again...' : 'Log In'

    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
        <div className={styles.logo} />
        <p className={styles.text}> Welcome back!</p>
        <div className={styles.formWrapper}>
          <form onSubmit={this.onSubmit} className={styles.form}>
            <FormInput name={'Username'} errors={username} className={[styles.formGroup]} callBack={this.setElId}/>
            <FormInput name={'Password'} errors={password} className={[styles.formGroup]} callBack={this.setElId} password/>
            <div to='/' className={styles.submitWrapper}>
              <Button value={buttonClass} className={styles.submit} disabled={!!remainingTime || loadingTimeout} onClick={this.auth} />
              { remainingTime && <p className={styles.counter}>{`${remainingTime}s left`}</p>}
              {/* <ReCAPTCHA ref={this.recaptchaRef} sitekey='6Lev1KUUAAAAAKBHldTqZdeR1XdZDLQiOOgMXJ-S' size='invisible' onChange={this.onChange}/> */}
            </div>
          </form>
          <div className={styles.image} />
        </div>
      </div>
    )
  }
}
export default withRouter(LoginPrompt)
