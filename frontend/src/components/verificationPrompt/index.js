import React, { Component } from 'react'
import styles from './verificationPrompt.scss'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import { RedirectUtil } from '../../util'
import { Loader } from '../index'

@inject('store')
@observer
class VerificationPrompt extends Component {
  constructor(props) {
    super(props)

    this.state = {
      didVerificationFail: false,
    }
  }

  componentDidMount() {
    this.handleCode()
  }

  handleCode() {
    const { code } = this.props

    if (!code) return

    Axios.defaults.baseURL = this.props.store.defaultData.backendUrl

    Axios.post(`/account-verify/${ code }`, { }, { withCredentials: true })
      .then((res) => {
        const { user } = res.data

        this.props.store.profile.loginVerify()
        this.props.store.profile.setProfileData(user)

        RedirectUtil.getRedirectPath()
          ? this.redirect()
          : this.goToProfile(user.profile.display_name)
      })
      .catch(() => {
        this.setState({ didVerificationFail: true })
      })
  }

  goToProfile = (username) => {
    this.props.history.push('/profile/' + username)
  }

  redirect = () => {
    this.props.history.push(RedirectUtil.getRedirectPath())

    RedirectUtil.undoRedirectPath()
  }

  emailSentTitle() {
    return <p>
      Verification email sent
    </p>
  }

  emailSentContent() {
    return <p>
      Almost done! Please verify your email address at { this.props.verification?.email } to get started.
    </p>
  }

  verifyCodeTitle() {
    return this.state.didVerificationFail
      ? <p>Invalid verification code</p>
      : <p>Verifying</p>
  }

  verifyCodeContent() {
    return this.state.didVerificationFail
      ? (
        <p>
          This verification code does not exist. Has your account already been verified?
        </p>
      )
      : (
        <Loader/>
      )
  }

  render() {
    const { verification, code } = this.props

    return (
      <div className={ [styles.prompt, this.props.className].join(' ') }>
        <div className={ styles.text }>
          { code ? this.verifyCodeTitle() : this.emailSentTitle() }
        </div>
        <div className={ styles.content }>
          { code ? this.verifyCodeContent() : this.emailSentContent() }
        </div>

        {/* TODO temporary email replacement */}
        { !code && (
          <a href={ verification?.verificationUrl || '#' }>
            Verify
          </a>
        ) }
      </div>
    )
  }
}

export default withRouter(VerificationPrompt)
