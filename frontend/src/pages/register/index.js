import React from 'react'
import App from '../App'
import { Standard } from '../../layouts'
import { RegisterPrompt, VerificationPrompt } from '../../components'
import styles from './register.scss'
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
class Register extends App {
  constructor(props) {
    super(props)

    this.state = {
      verification: null
    }

    this.setVerification = this.setVerification.bind(this)
  }

  setVerification(verification) {
    console.log(verification)

    this.setState({
      verification
    })
  }

  render() {
    const { verification } = this.state

    console.log(!verification)

    return (
      <Standard>
        <div className={ styles.container }>
          <div className={ styles.background } />
          { !verification
            ? (<RegisterPrompt className={ styles.prompt } onRegistration={ this.setVerification } />)
            : (<VerificationPrompt className={ styles.prompt } verification={ verification } />)
          }
        </div>
      </Standard>
    )
  }
}

export default Register
