import React, { Component, KeyboardEvent } from 'react'
import Axios from 'axios'
import styles from './prompt.scss'
import { Button } from '../../components'
import { Icon, FormInput } from '../../components'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'

@inject('store') @observer
class Prompt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      email: null,
      password: null
    }
    this.elId = {}
  }

  auth = () => {
    Axios.defaults.baseURL = 'http://localhost:8000/api';

    const payload={
      email: document.getElementById(this.elId.Email).value,
      password: document.getElementById(this.elId.Password).value
    }

    Axios.post('/login', payload)
    .then(response => {
      const { token, error } = response.data

      if (token) {
        this.setState({ email: [], password: [] })
        Axios.get('/user', {
          mode:'cors',
          headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type':'application/json', 'Authorization': `Bearer ${token}` }
        }).then(user => {
          this.userData = user.data.user
        })
        .then(localStorage.setItem('user', JSON.stringify(this.userData)))
        .then(() => {
            this.props.store.user.fillUserData(this.userData)
        })
      } else if (error) {
        this.setState({ email: error, password: error })
      }
    })
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
    const { user } = this.props.store
    const { email, password } = this.state

    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
        { user.loggedIn && <Redirect to='/profile' /> }
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

export default Prompt
