import React from 'react'
import App from '../App'
import { Standard } from '../../layouts'
import RegisterPrompt from '../../components/registerPrompt'
import styles from './register.scss'

class Register extends App {
  render() {
    return (
      <Standard>
        <div className={styles.container}>
          <div className={styles.background} />
          <RegisterPrompt className={styles.prompt} />
        </div>
      </Standard>
    )
  }
}

export default Register
