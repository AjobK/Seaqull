import React, { Component } from 'react'
import styles from './registerprompt.scss'
import Button from '../button'
import { inject, observer } from 'mobx-react'
import { Icon } from '../../components'
import ReactTooltip from 'react-tooltip'
import Axios from 'axios';

@inject('store') @observer
class RegisterPrompt extends Component {
  constructor(props) {
    super(props)

    this.elId = {}

    this.state = {
      data: null,
      name: null,
      email: null,
      password: null
    }
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

  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      this.auth();
    }
  }
  auth = () => {
    const url = `${this.props.store.defaultData.backendUrl}/api/register`

    const payload={
      name: document.getElementById(this.elId.name).value,
      email: document.getElementById(this.elId.email).value,
      password: document.getElementById(this.elId.password).value
    }

    Axios.post(url, payload)
    .then(res => {
      if (res.data.errors) {
        const { name, email, password } = res.data.errors

        this.setState({
          name: name || [],
          email: email || [],
          password: password || []
        })
      } else {
        this.setState({
          name: [],
          email: [],
          password: []
        })

        //storing token in local
        localStorage.setItem('token', res.data.token)

        // Put user data in user store
        Axios.get('http://localhost:8000/api/user', {
          method:'GET',
          mode:'cors',
          headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type':'application/json', 'Authorization': `Bearer ${res.data.token}` }
        }).then(user => user.data).then(userData => localStorage.setItem('user', JSON.stringify(userData.user)))
      }
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.auth()
  }

  render() {

    const { name, email, password } = this.state

    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
        <div className={styles.logo} />
        <p className={styles.text}>Join our community <Icon className={styles.textIcon} iconName={'Crow'} /></p>
        <div className={styles.formWrapper}>
          <form method='POST' className={styles.form} onSubmit={this.onSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor={this.getElId('name')} className={styles.label}>
                <Icon
                  iconName={ (name == null && 'MinusCircle') || (name.length <= 0 ? 'CheckCircle' : 'TimesCircle') }
                  className={`${styles.icon} ${ (name == null && 'noClass') || (name.length <= 0 ? styles.iconCheck : styles.iconTimes) }`}
                />
                Username
              </label>
              <input data-tip data-for={this.getElId('nameToolTip')} data-event='focus' data-event-off='blur' type='text' id={this.getElId('name')} name={this.getElId('name')} className={styles.input}/>
              {(name && name.length > 0 && <ReactTooltip id={this.getElId('nameToolTip')} effect={'solid'} place={'right'} className={styles.toolTip}>
                <ul className={styles.toolTipUl}>
                  {name.map((msg, i) => <li key={i} className={styles.toolTipLi}>{msg}</li>)}
                </ul>
              </ReactTooltip>)}
            </div>
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
              <Button onClick={this.auth} value='Register' className={styles.submit} />
            </div>
          </form>
          <div className={styles.image} />
        </div>
        <p className={styles.textFooter}><small>By registering I confirm that I have read and agree to the </small><a className={styles.textFooter_link}href='#'>Terms of service</a></p>
      </div>
    )
  }
}

export default RegisterPrompt