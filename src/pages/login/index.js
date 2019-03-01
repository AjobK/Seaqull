import React from 'react'
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard } from '../../layouts'
import Prompt from '../../components/prompt'

@inject('store') @observer
class Login extends App {
  render() {
    <Standard>
      <Prompt />
    </Standard>
  }
}

export default Login