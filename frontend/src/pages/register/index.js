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
    this.setState({
      verification
    })
  }

  render() {
    const { verification } = this.state
    const { code } = this.props.match.params

    return (
      <Standard>
        <div className={ styles.container }>
          <div className={ styles.background } />
          { !verification && !code
            ? (<RegisterPrompt className={ styles.prompt } onRegistration={ this.setVerification } />)
            : (
              <VerificationPrompt
                className={ styles.prompt }
                verification={ verification }
                code={ code }
              />
            )
          }
        </div>
      </Standard>
    )
  }
}

export default Register
