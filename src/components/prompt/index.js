import React, { Component } from 'react'
import styles from './prompt.scss'
// import { inject, observer } from 'mobx-react'

// @inject('store') @observer
class Prompt extends Component {
  render() {
    return (
      <div className={styles.prompt}>
        <p className={styles.text}> Welcome back! </p>
        <form action="" method="POST" className={styles.form}>
          <div className={styles.inputs}>
            <div className={styles.username}>
              <label for='username' className={styles.label}>Username</label><br />
              <input type='text' id='username' name='username' className={styles.input} />
            </div>
            <div className={styles.password}> <br />
              <label for='password' className={styles.label}>Password</label><br />
              <input type='password' id='password' name='password' className={styles.input} />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Prompt