import React, { Component } from 'react'
import styles from './postsPreview.scss'
import Plus from '../../static/icons/plus.svg'
import { PreviewPost } from '../../components'
import { inject, observer } from 'mobx-react';

@inject('store') @observer
class PostsPreview extends Component {
  render() {
    const posts = this.props.posts

    let arr = []

    for (let i = 0; i < posts.length; i++) {
      arr.push(
        <PreviewPost title={posts[i].title} key={i} likes={Math.floor(Math.random() * 10)} />
      )
    }

    for (let i = 0; i < 8 - posts.length; i++) {
      arr.push(
        <PreviewPost filler key={'filler_' + i}></PreviewPost>
      )
    }

    return (
      <section className={styles.wrapper}>
        {this.props.create &&
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
