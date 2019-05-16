import React, { Component } from 'react'
import styles from './registerprompt.scss'
import Button from '../button'

class RegisterPrompt extends Component {
  auth = () => {
    const url = 'http://api.seaqull.com/api/register'
    const email = document.querySelector('#email').value
    const user = document.querySelector('#name').value
    const pass = document.querySelector('#password').value
    const bodyData = `name=${user}&email=${email}&password=${pass}`
    const headersData = { 'Access-Control-Allow-Origin': '*', 'Content-Type':'application/x-www-form-urlencoded', mode: 'no-cors'}
    const request = {method:'POST',mode:'no-cors', headers: headersData, body: bodyData}

    fetch(url,request)
      .then(response => {
        console.log(bodyData)
        console.log(headersData)
        return response
      })
      .then(dataReturned => console.log(dataReturned))
      .catch(error => alert(error))
  }
  render() {

    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
        <div className={styles.logo} />
        <p className={styles.text}>Join our community</p>
        <div className={styles.formWrapper}>
          <form method='POST' className={styles.form}>
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