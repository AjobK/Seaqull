import React, { Component } from 'react'
import styles from './postsPreview.scss'
import Plus from '../../static/icons/plus.svg'
import { PreviewPost } from '../../components'
import { inject, observer } from 'mobx-react';

@inject('store') @observer
class PostsPreview extends Component {
  render() {
    const { user } = this.props.store
    let arr = []

    for (let i = 1; i <= 8; i++) {
      arr.push(
        <PreviewPost key={i} likes={Math.floor(Math.random() * 10)} />
      )
    }

    return (
      <section className={styles.wrapper}>
        {user.loggedIn && this.props.create &&
          (<div className={styles.add}>
            <img className={styles.addIcon} src={Plus} draggable={false} />
          </div>)
        }
        {arr}
        <div className={`${styles.article} ${styles.fillerMobile}`} />
      </section>
    )
  }
}

export default PostsPreview