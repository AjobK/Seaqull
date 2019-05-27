import React, { Component } from 'react'
import Axios from 'axios'
import styles from './loginPrompt.scss'
import { Button } from '../../components'
import { FormInput } from '../../components'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

@inject('store') @observer
class LoginPrompt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: null
    }
    this.elId = {}
  }

  auth = () => {
    Axios.defaults.baseURL = 'http://localhost:8000/api';

    const payload = {
      email: document.getElementById(this.elId.Email).value,
      password: document.getElementById(this.elId.Password).value
    }

    Axios.post('/login', payload)
    .then(res => {
      Axios.get('/user', {
        mode:'cors',
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type':'application/json', 'Authorization': `Bearer ${res.data.token}` }
      })
      .then(user => {
        localStorage.setItem('user', JSON.stringify(user.data.user))
        return user.data.user
      })
      .then(user => {
          this.props.store.user.fillUserData(user)
          this.goToProfile()
      })
    })
    .catch(res => {
      const { error } = res.response.data
      this.setState({
        email: error || [],
        password: error || []
      })
    })
  }

  goToProfile = () => {
    this.props.history.push('/profile')
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({
      email: 'loading',
      password: 'loading'
    })
    this.auth()
  }

  setElId = (item, id) => {
    this.elId[item.props.name] = id
  }
  
  render() {
    const { email, password } = this.state

    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
        <div className={styles.logo} />
        <p className={styles.text}> Welcome back! </p>
        <div className={styles.formWrapper}>
          <form onSubmit={this.onSubmit} className={styles.form}>
            <FormInput name={'Email'} errors={email} className={[styles.formGroup]} callBack={this.setElId}/>
            <FormInput name={'Password'} errors={password} className={[styles.formGroup]} callBack={this.setElId} password/>
            <div to='/' className={styles.submit_wrapper}>
              <Button onClick={this.auth} value='Log In' className={styles.submit} />
            </div>
          </form>
          <div className={styles.image} />
        </div>
      </div>
    )
  }
}

export default withRouter(LoginPrompt)
