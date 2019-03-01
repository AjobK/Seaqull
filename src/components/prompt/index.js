import React, { Component } from 'react'
import styles from './prompt.scss'
// import { inject, observer } from 'mobx-react'

// @inject('store') @observer
class Prompt extends Component {
  render() {
    const action = 'localhost:8080/user/login'

    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
        <p className={styles.text}> Welcome back! </p>
        <form action={action} method='POST' className={styles.form}>
          <div className={styles.inputs}>
            <div className={styles.username}>
              <label htmlFor='username' className={styles.label}>Username</label>
              <input type='text' id='username' name='username' className={styles.input} />
            </div>
            <div className={styles.password}> <br />
              <label htmlFor='password' className={styles.label}>Password</label>
              <input type='password' id='password' name='password' className={styles.input} />
            </div>
          </div>
          <input type='submit' name='submit' value='Log in' className={styles.submit} />
        </form>
        <img className={styles.image} />
      </div>
    )
  }
}

export default Prompt