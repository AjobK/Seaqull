import React from 'react'
import App from '../App'
import { Standard } from '../../layouts'
import LoginPrompt from '../../components/loginPrompt'
import styles from './login.scss'

class Login extends App {
  render() {
    return (
      <Standard>
        <div className={ styles.container }>
          <div className={ styles.background } />
          <LoginPrompt className={ styles.prompt } />
        </div>
      </Standard>
    )
  }
}

export default Login
