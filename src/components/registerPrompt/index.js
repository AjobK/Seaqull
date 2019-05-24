import React, { Component } from 'react'
import styles from './registerprompt.scss'
import Button from '../button'
import { inject, observer } from 'mobx-react'
import { Icon, FormInput } from '../../components'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'

@inject('store') @observer
class RegisterPrompt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      name: null,
      email: null,
      password: null
    }

    this.elId = {}
  }

  auth = () => {
    const url = `${this.props.store.defaultData.backendUrl}/api/register`
    const userStore = this.props.store.user
    const payload = {
      name: document.getElementById(this.elId.Username).value,
      email: document.getElementById(this.elId.Email).value,
      password: document.getElementById(this.elId.Password).value
    }

    Axios.post(url, payload)
    .then(res => {
      if (res.data.errors) {
        const { name, email, password } = res.data.errors

        this.setState({
          name: name || [],
          email: email || [],
          password: password || []
        })
      } else {
        this.setState({
          name: [],
          email: [],
          password: []
        })
        // Put user data in user store
        Axios.get('http://localhost:8000/api/user', {
          method:'GET',
          mode:'cors',
          headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type':'application/json', 'Authorization': `Bearer ${res.data.token}` }
        }).then(user => {
          this.userData = user.data.user
        })
        .then(localStorage.setItem('user', JSON.stringify(this.userData)))
        .then(() => {
            this.props.store.user.fillUserData(this.userData)
        })
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
    const { user } = this.props.store
    const { name, email, password } = this.state

    return (
      <div className={[styles.prompt, this.props.className].join(' ')}>
      { user.loggedIn && <Redirect to='/profile' /> }
        <div className={styles.logo} />
        <p className={styles.text}>Join our community <Icon className={styles.textIcon} iconName={'Crow'} /></p>
        <div className={styles.formWrapper}>
          <form method='POST' className={styles.form} onSubmit={this.onSubmit}>
            <FormInput name={'Username'} errors={name} className={[styles.formGroup]} callBack={this.setElId}/>
            <FormInput name={'Email'} errors={email} className={[styles.formGroup]} callBack={this.setElId}/>
            <FormInput name={'Password'} errors={password} className={[styles.formGroup]} callBack={this.setElId} password/>
            <div to='/' className={styles.submitWrapper}>
              <Button value={'Register'} className={styles.submit} />
            </div>
          </form>
          <div className={styles.image} />
        </div>
        <p className={styles.textFooter}>
          <small>By registering I confirm that I have read and agree to the </small>
          <a className={styles.textFooter_link}href='#'>Terms of service</a>
        </p>
      </div>
    )
  }
}

export default RegisterPrompt