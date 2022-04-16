import React, { Component } from 'react'
import styles from './verificationPrompt.scss'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

@inject('store')
@observer
class VerificationPrompt extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { verification } = this.props

    return (
      <div className={ [styles.prompt, this.props.className].join(' ') }>
        <p className={ styles.text }>
          Verification email sent
        </p>
        <div className={ styles.content }>
          <p>
              Almost done! Please verify your email address at { verification?.email } to get started.
          </p>
          {/* TODO temporary email replacement */}
          <a href={ verification?.verificationUrl || '#' }>
            Verify
          </a>
        </div>
      </div>
    )
  }
}

export default withRouter(VerificationPrompt)
