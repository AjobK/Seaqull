import React, { Component, KeyboardEvent } from 'react'
import Axios from 'axios'
import styles from './prompt.scss'
import { Icon, Button } from '../../components'
import ReactTooltip from 'react-tooltip'
import { inject, observer } from 'mobx-react'

@inject('store') @observer
class Prompt extends Component {
  constructor(props) {
    super(props)

    this.elId = {}

    this.state = {
      data: null,
      email: null,
      password: null
    }
  }

  auth = () => {
    const apiBaseUrl = 'http://localhost:8000/api/';

    const payload={
      email: document.getElementById(this.elId.email).value,
      password: document.getElementById(this.elId.password).value
    } 

    Axios.post(apiBaseUrl + 'login', payload)
    .then(response => {
      const { token, error } = response.data

      if (token) {
        this.setState({ email: [], password: [] })
        Axios.get('http://localhost:8000/api/user', {
          method:'GET',
          mode:'cors',
          headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type':'application/json', 'Authorization': `Bearer ${token}` }
        }).then(user => user.data)
        .then(userData => localStorage.setItem('user', JSON.stringify(userData.user)))
        .then(this.props.store.user.fillUserData(JSON.parse(localStorage.user)))
      } else if (error) {
        this.setState({ email: error, password: error })
      }
    })
  }

  // Unique keys to avoid botting
  getElId(param) {
    if (!this.elId[param]) {
      this.elId[param] = param + '-' + (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      )
    }

    return this.elId[param]
  }
  onSubmit = (e) => {
    e.preventDefault()
    this.auth()
  }
  
  render() {
    const { email, password } = this.state

    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
        <div className={styles.logo} />
        <p className={styles.text}> Welcome back! </p>
        <div className={styles.formWrapper}>
          <form onSubmit={this.onSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor={this.getElId('email')} className={styles.label}>
              <Icon
                  iconName={ (email == null && 'MinusCircle') || (email.length <= 0 ? 'CheckCircle' : 'TimesCircle') }
                  className={`${styles.icon} ${ (email == null && 'noClass') || (email.length <= 0 ? styles.iconCheck : styles.iconTimes) }`}
                />
                Email
              </label>
              <input data-tip data-for={this.getElId('emailToolTip')} data-event='focus' data-event-off='blur' type='text' id={this.getElId('email')} name={this.getElId('email')} className={styles.input} />
              {(email && email.length > 0 && <ReactTooltip id={this.getElId('emailToolTip')} effect={'solid'} place={'right'} className={styles.toolTip}>
                <ul className={styles.toolTipUl}>
                  {email.map((msg, i) => <li key={i} className={styles.toolTipLi}>{msg}</li>)}
                </ul>
              </ReactTooltip>)}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor={this.getElId('password')} className={styles.label}>
                <Icon
                  iconName={ (password == null && 'MinusCircle') || (password.length <= 0 ? 'CheckCircle' : 'TimesCircle') }
                  className={`${styles.icon} ${ (password == null && 'noClass') || (password.length <= 0 ? styles.iconCheck : styles.iconTimes) }`}
                />
                Password
              {(password && password.length > 0 && <ReactTooltip id={this.getElId('passwordToolTip')} effect={'solid'} place={'right'} className={styles.toolTip}>
                <ul className={styles.toolTipUl}>
                  {password.map((msg, i) => <li key={i} className={styles.toolTipLi}>{msg}</li>)}
                </ul>
              </ReactTooltip>)}
              </label>
              <input data-tip data-for={this.getElId('passwordToolTip')} data-event='focus' data-event-off='blur' type='password' id={this.getElId('password')} name={this.getElId('password')} className={styles.input} />
            </div>
            <div to='/' className={styles.submit_wrapper}>
              <Button onClick={this.auth} value='Log In' className={styles.submit} />
            </div>
          </form>
          <div className={styles.image} />
        </div>
      </div>
    )
  }
}

export default Prompt
