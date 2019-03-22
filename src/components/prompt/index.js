import React, { Component } from 'react'
import styles from './prompt.scss'

class Prompt extends Component {
  render() {
    const action = 'localhost:8080/user/login'

    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
        <div className={styles.logo} />
        <p className={styles.text}> Welcome back! </p>
        <div className={styles.formWrapper}>
          <form action={action} method='POST' className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor='username' className={styles.label}>Username</label>
              <input type='text' id='username' name='username' className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='password' className={styles.label}>Password</label>
              <input type='password' id='password' name='password' className={styles.input} />
            </div>
            <div to='/' className={styles.submit_wrapper}>
              <input type='submit' name='submit' value='Log in' className={styles.submit} />
            </div>
          </form>
          <div className={styles.image} />
        </div>
      </div>
    )
  }
}

export default Prompt