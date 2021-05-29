import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './main.scss'
import { PostsBlock } from '../../components'

@inject('store') @observer
class Main extends Component {
  render() {
    return (
        <div className={styles.main}>
            <PostsBlock/>
        </div>
    )
  }
}

export default Main
