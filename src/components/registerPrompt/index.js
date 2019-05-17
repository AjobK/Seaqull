import React, { Component } from 'react'
import styles from './registerprompt.scss'
import Button from '../button'
import { inject, observer } from 'mobx-react'
import { Icon } from '../../components'
import ReactTooltip from 'react-tooltip'

@inject('store') @observer
class RegisterPrompt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      name: null,
      email: null,
      password: null
    }
  }

  auth = () => {
    const url = `${this.props.store.defaultData.backendUrl}/api/register`
    const email = document.querySelector('#email').value
    const name = document.querySelector('#name').value
    const password = document.querySelector('#password').value

    fetch(url, {
      method:'POST',
      mode:'cors',
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type':'application/json' },
      body: JSON.stringify({ name: name, email: email, password: password })
    })
    .then(res => res.json())
    .then(json => {
      if (json.errors) {
        const { name, email, password } = json.errors
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
        alert('Registered!')
      }
    })
  }

  render() {
    const { name, email, password } = this.state

    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
        <div className={styles.logo} />
        <p className={styles.text}>Join our community</p>
        <div className={styles.formWrapper}>
          <form method='POST' className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor='name' className={styles.label}>
                <Icon
                  iconName={ (name == null && 'MinusCircle') || (name.length <= 0 ? 'CheckCircle' : 'TimesCircle') }
                  className={`${styles.icon} ${ (name == null && 'noClass') || (name.length <= 0 ? styles.iconCheck : styles.iconTimes) }`} 
                />
                Username
              </label>
              <input data-tip data-for='nameToolTip' data-event='focus blur' type='text' id='name' name='name' className={styles.input}/>
              {(name && name.length > 0 && <ReactTooltip id='nameToolTip' effect={'solid'} place={'right'} className={styles.toolTip}>
                <ul className={styles.toolTipUl}>
                  {name.map((msg, i) => <li key={i} className={styles.toolTipLi}>{msg}</li>)}
                </ul>
              </ReactTooltip>)}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='email' className={styles.label}>
                <Icon
                  iconName={ (email == null && 'MinusCircle') || (email.length <= 0  ? 'CheckCircle' : 'TimesCircle') }
                  className={`${styles.icon} ${ (email == null && 'noClass') || (email.length <= 0 ? styles.iconCheck : styles.iconTimes) }`} 
                />
                Email
              </label>
              <input data-tip data-for='emailToolTip' data-event='focus blur' type='text' id='email' name='email' className={styles.input} />
              {(email && email.length > 0 && <ReactTooltip id='emailToolTip' effect={'solid'} place={'right'} className={styles.toolTip}>
                <ul className={styles.toolTipUl}>
                  {email.map((msg, i) => <li key={i} className={styles.toolTipLi}>{msg}</li>)}
                </ul>
              </ReactTooltip>)}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='password' className={styles.label}>
                <Icon
                  iconName={ (password == null && 'MinusCircle') || (password.length <= 0  ? 'CheckCircle' : 'TimesCircle') }
                  className={`${styles.icon} ${ (password == null && 'noClass') || (password.length <= 0 ? styles.iconCheck : styles.iconTimes) }`} 
                />
                Password
              {(password && password.length > 0 && <ReactTooltip id='passwordToolTip' effect={'solid'} place={'right'} className={styles.toolTip}>
                <ul className={styles.toolTipUl}>
                  {password.map((msg, i) => <li key={i} className={styles.toolTipLi}>{msg}</li>)}
                </ul>
              </ReactTooltip>)}
              </label>
              <input data-tip data-for='passwordToolTip' data-event='focus blur' type='password' id='password' name='password' className={styles.input} />
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