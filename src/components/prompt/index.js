import React, { Component } from 'react'
import axios from 'axios'
import styles from './prompt.scss'
import { Button } from '../../components'

class Prompt extends Component {
  /*auth = () => {
    const url = `http://localhost:8000/api/login`
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    }).then(json => json.json())
    .then(
        data => console.log(data),
        data => localStorage.setItem('token', data)   
    ) 
  }*/
  handleClick(){
    const apiBaseUrl = 'http://localhost:8000/api/';
    const payload={
      'email':document.querySelector('#email').value,
      'password':document.querySelector('#password').value
    }
    axios.post(apiBaseUrl+'login', payload)
    .then(function (response) {
      sessionStorage.setItem('token', response.data.token)
    }).catch(function (error) {
      console.log('login mislukt: ' + error)
    })
  }

  render() {
    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
        <div className={styles.logo} />
        <p className={styles.text}> Welcome back! </p>
        <div className={styles.formWrapper}>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor='email' className={styles.label}>Email</label>
              <input type='text' id='email' name='email' className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='password' className={styles.label}>Password</label>
              <input type='password' id='password' name='password' className={styles.input} />
            </div>
            <div to='/' className={styles.submit_wrapper}>
              <Button onClick={this.handleClick} value='Log in' className={styles.submit} />
            </div>
          </form>
          <div className={styles.image} />
        </div>
      </div>
    )
  }
}

export default Prompt
