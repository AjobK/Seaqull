import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './main.scss'
import { PostsBlock } from '../../components'

@inject('store') @observer
class Main extends Component {
  render() {
    return (
        <div className={styles.main}>
            <PostsBlock structure={'LS'}/>
            <PostsBlock structure={'SS'}/>
            <PostsBlock structure={'SL'}/>
        </div>
    )
  }
}

export default Main
