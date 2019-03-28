import React, { Component } from 'react'
import styles from './registerprompt.scss'

class RegisterPrompt extends Component {
  render() {
    const action = 'localhost:8080/user/register'

    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
        <div className={styles.logo} />
        <p className={styles.text}>Join our community!</p>
        <div className={styles.formWrapper}>
          <form action={action} method='POST' className={styles.form}>
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
              <input type='submit' name='submit' value='Register' className={styles.submit} />
            </div>
          </form>
          <div className={styles.image} />
        </div>
        <p className={styles.textFooter}>By registering I confirm that I have read and agree to the <a className={styles.textFooter_link}href='#'>Terms of service</a></p>
      </div>
    )
  }
}

export default RegisterPrompt