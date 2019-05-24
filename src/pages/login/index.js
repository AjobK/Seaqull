import React from 'react'
import App from '../App'
import { Standard } from '../../layouts'
import Prompt from '../../components/prompt'
import styles from './login.scss'

class Login extends App {
  render() {
    return (
      <Standard>
        <div className={styles.container}>
          <div className={styles.background} />
          <Prompt className={styles.prompt} />
        </div>
      </Standard>
    )
  }
}

export default Login
