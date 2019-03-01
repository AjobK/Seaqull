import React from 'react'
import App from '../App'
import { Standard } from '../../layouts'
import Prompt from '../../components/prompt'
import styles from './login.scss'

class Home extends App {
  render() {
    return (
      <Standard>
        <Prompt className={styles.prompt} />
      </Standard>
    )
  }
}

export default Home
