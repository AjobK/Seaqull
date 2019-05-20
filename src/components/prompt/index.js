import React, { Component } from 'react'
import axios from 'axios'
import styles from './prompt.scss'
import { Button } from '../../components'
import { Icon } from '../../components'
import ReactTooltip from 'react-tooltip'

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

  handleClick = () => {
    const apiBaseUrl = 'http://localhost:8000/api/';
    const payload={
      email: document.getElementById(this.elId.email).value,
      password: document.getElementById(this.elId.password).value
    }
    axios.post(apiBaseUrl+'login', payload)
    .then(function (response) {
      sessionStorage.setItem('token', response.data.token)
    }).catch(function (error) {
      console.log('login mislukt: ' + error)
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

  render() {
    const { email, password } = this.state

    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
        <div className={styles.logo} />
        <p className={styles.text}> Welcome back! </p>
        <div className={styles.formWrapper}>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor={this.getElId('email')} className={styles.label}>
              <Icon
                  iconName={ (email == null && 'MinusCircle') || (email.length <= 0  ? 'CheckCircle' : 'TimesCircle') }
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
                  iconName={ (password == null && 'MinusCircle') || (password.length <= 0  ? 'CheckCircle' : 'TimesCircle') }
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
              <Button onClick={this.handleClick} value='Log In' className={styles.submit} />
            </div>
          </form>
          <div className={styles.image} />
        </div>
      </div>
    )
  }
}

export default Prompt
