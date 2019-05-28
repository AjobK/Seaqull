import React, { Component } from 'react'
import styles from './registerprompt.scss'
import Button from '../button'

class RegisterPrompt extends Component {
  auth = () => {
    const url = 'http://localhost:8000/api/register'
    const email = document.querySelector('#email').value
    const user = document.querySelector('#username').value
    const pass = document.querySelector('#password').value
    const data = {
      name: '' + user + '',
      email: '' + email + '',
      password: '' + pass + ''
    }
    const formData = new FormData()

    for (let k in data) {
      formData.append(k, data[k]);
    }

    const request = {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    }

    fetch(url,request)
      .then(response => {
        if(!response.ok){
          throw new Error('something went wrong, please try again')
        }

        return response
      })
  }
  render() {

    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
        <div className={styles.logo} />
        <p className={styles.text}>Join our community</p>
        <div className={styles.formWrapper}>
          <form method='POST' className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor='username' className={styles.label}>Username</label>
              <input type='text' id='username' name='username' className={styles.input} />
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
              <Button onClick={this.auth} type='submit' name='submit' value='Register' className={styles.submit} />
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