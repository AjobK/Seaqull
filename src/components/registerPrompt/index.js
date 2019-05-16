import React, { Component } from 'react'
import styles from './registerprompt.scss'
import Button from '../button'

class RegisterPrompt extends Component {
  auth = () => {
    const url = 'http://localhost:8000/api/register'
    const email = document.querySelector('#email').value
    const name = document.querySelector('#name').value
    const password = document.querySelector('#password').value

    fetch(url, {
      method:'POST',
      mode:'cors',
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type':'application/json'},
      body: JSON.stringify({ name: name, email: email, password: password })
    }).then(json => json.json()).then(data => alert(data))
  }
  render() {
    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
        <div className={styles.logo} />
        <p className={styles.text}>Join our community</p>
        <div className={styles.formWrapper}>
          <form method='POST' action={'http://localhost:8000/api/register'} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor='name' className={styles.label}>Username</label>
              <input type='text' id='name' name='name' className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='email' className={styles.label}>Email</label>
              <input type='text' id='email' name='email' className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='password' className={styles.label}>Password</label>
              <input type='password' id='password' name='password' className={styles.input} />
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