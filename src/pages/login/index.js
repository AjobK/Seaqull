import React from 'react'
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard } from '../../layouts'

@inject('store') @observer
class Login extends App {
  render() {
    <Standard>
    </Standard>
  }
}

export default Login