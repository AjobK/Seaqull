import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './main.scss'
import { Posts } from '../../components'

@inject('store') @observer
class Main extends Component {
  render() {
    return (
        <div className={styles.main}>
            <Posts/>
        </div>
    )
  }
}

export default Main
