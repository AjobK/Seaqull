import React from 'react'
import App from '../App'
import { Standard, Main } from '../../layouts'
import { AvatarCreator } from '../../components'

class Home extends App {
  render() {
    return (
      <Standard>
        <AvatarCreator />
        <Main />
      </Standard>
    )
  }
}

export default Home
