import React, { Component } from 'react'
import Axios from 'axios'
import styles from './loginPrompt.scss'
import { Button, FormInput, PopUp } from '../../components'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'
import { popUpData } from '../popUp/popUpData'

@inject('store') @observer
class LoginPrompt extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: null,
      password: null,
      remainingTimeInterval: null,
      remainingTime: null,
      recaptcha: null,
      loadingTimeout: false,
      popupData: null
    }

    this.recaptchaRef = React.createRef()
    this.onChange = this.onChange.bind(this)
    this.elId = {}
  }

  auth = () => {
    Axios.defaults.baseURL = this.props.store.defaultData.backendUrl

    const payload = {
      username: document.getElementById(this.elId.Username).value,
      password: document.getElementById(this.elId.Password).value,
      recaptcha: this.recaptchaRef.current.getValue()
    }

    Axios.post('/login', payload, {withCredentials: true})
    .then(res => {
      this.props.store.profile.setLoggedIn(true)
      this.props.store.user.fillUserData(res.data.user)
      this.goToProfile(res.data.user_name)
    })
    .catch(res => {
      if (res.message === 'Network Error') {
        return this.setState({
          popupData: {
            ...popUpData.messages.networkError,
            close: this.closePopUp
          },
          username: ['No connection'],
          password: ['No connection'],
          loadingTimeout: false
        })
      }

      const { errors, remainingTime } = res.response.data

      if (remainingTime) this.setRemainingTimeInterval(remainingTime)

      this.setState({
        username: errors || [],
        password: errors || [],
        loadingTimeout: false
      })
    })
  }

  closePopUp = () => {
    this.setState({
      popupData: null
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
    
    if (!this.recaptchaRef.current.getValue()) {
      this.recaptchaRef.current.reset()
      this.recaptchaRef.current.execute()
    } else {
      this.auth()
    }
  }

  setElId = (item, id) => {
    this.elId[item.props.name] = id
  }

  onChange = () => {
    this.auth()
  }

  render() {
    const { username, password, remainingTime,recaptcha, loadingTimeout, popupData } = this.state
    let buttonClass = Array.isArray(recaptcha) && recaptcha.length > 0 ? 'Try again...' : 'Log In'

    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
        <div className={styles.logo} />
        <p className={styles.text}> Welcome back!</p>
        <div className={styles.formWrapper}>
          <form onSubmit={this.onSubmit} className={styles.form}>
            <FormInput toolTipDirection={ 'bottom' } name={'Username'} errors={username} className={[styles.formGroup]} callBack={this.setElId} type='text'/>
            <FormInput toolTipDirection={ 'bottom' } name={'Password'} errors={password} className={[styles.formGroup]} callBack={this.setElId} type='password'/>
            <div to='/' className={styles.submitWrapper}>
              <Button value={buttonClass} className={styles.submit} disabled={!!remainingTime || loadingTimeout} />
              { <ReCAPTCHA 
              ref={this.recaptchaRef} 
              sitekey='6Lev1KUUAAAAAKBHldTqZdeR1XdZDLQiOOgMXJ-S' 
              size='invisible' 
              onChange={this.onChange}
              hl='en'/>
              }
              { remainingTime && <p className={styles.counter}>{`${remainingTime}s left`}</p>}
            </div>
          </form>
          <div className={styles.image} />
        </div>

        { popupData && (
            <PopUp content={ popupData } />
        )}
      </div>
    )
  }
}
export default withRouter(LoginPrompt)
