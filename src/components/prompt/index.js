import React, { Component, KeyboardEvent } from 'react'
import Axios from 'axios'
import styles from './prompt.scss'
import { Button } from '../../components'
import { Icon, FormInput } from '../../components'
import { inject, observer } from 'mobx-react'
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

    const apiBaseUrl = 'http://localhost:8000/api/';
    const payload={
      email: document.getElementById(this.elId.Email).value,
      password: document.getElementById(this.elId.Password).value
    }

    Axios.post(apiBaseUrl + 'login', payload)
    .then(response => {
      const { token, error } = response.data

      if (token) {
        this.setState({ email: [], password: [] })

        Axios.get('http://localhost:8000/api/user', {
          method:'GET',
          mode:'cors',
          headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type':'application/json', 'Authorization': `Bearer ${token}` }
        }).then(user => user.data).then(userData => localStorage.setItem('user', JSON.stringify(userData.user))).then(this.props.store.user.fillUserData(JSON.parse(localStorage.user)))
      } else if (error) {
        this.setState({ email: error, password: error })
      }
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
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
            <div to='/' className={styles.submitWrapper}>
              <Button value='Log In' className={styles.submit} />
            </div>
          </form>
          <div className={styles.image} />
        </div>
      </div>
    )
  }
}

export default Prompt
