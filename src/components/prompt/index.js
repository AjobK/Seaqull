import React, { Component } from 'react'
import styles from './prompt.scss'
import { inject, observer } from 'mobx-react'

@inject('store') @observer
class Prompt extends Component {
<<<<<<< HEAD
    auth = () => {
        const url = `localhost:8000/api/login`
        const email = document.querySelector('#username').value
        const password = document.querySelector('#password').value

        fetch(url, {
        method:'POST',
        mode:'cors',
        headers: { 'Content-Type':'application/json'},
        body: JSON.stringify({ name: name, email: email, password: password })
        }).then(json => json.json()).then(data => alert(data))
    }
  render() {
    const action = 'localhost:8080/user/login'
=======
>>>>>>> 5c70728c5d20ae6e71320ad008ab3165885b1adc

  auth = () => {
    const url = 'http://localhost:8000/api/login'
    const email = document.querySelector('#username').value
    const pass = document.querySelector('#password').value
    const data = {
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
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: {
        email: 'little.dolores@example.net',
        password: 'admin123'
      }
    }

    fetch(url, request)
      .then(response => response.json())
      .then(json => {
        // eslint-disable-next-line no-console
        console.log(json)
      })
  }

  componentDidMount() {
    // this.props.user = document.querySelector('#username').value
    // this.props.pass = document.querySelector('#password').value
    // document.querySelector('#submit').addEventListener('click', this.auth())
  }

  render() {
    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
        <div className={styles.logo} />
        <p className={styles.text}> Welcome back! </p>
        <div className={styles.formWrapper}>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor='username' className={styles.label}>Username</label>
              <input type='text' id='username' name='username' className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='password' className={styles.label}>Password</label>
              <input type='password' id='password' name='password' className={styles.input} />
            </div>
            <div to='/' className={styles.submit_wrapper}>
<<<<<<< HEAD
              <input onClick={this.auth}  type='submit' name='submit' value='Log in' className={styles.submit} />
=======
              <input onClick={this.auth} id='submit' type='button' name='submit' value='Log in' className={styles.submit} />
>>>>>>> 5c70728c5d20ae6e71320ad008ab3165885b1adc
            </div>
          </form>
          <div className={styles.image} />
        </div>
      </div>
    )
  }
}

export default Prompt
