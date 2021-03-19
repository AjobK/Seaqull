import React, { Component } from 'react'
import styles from './previewPost.scss'
import { Icon } from '../../components'
import Link from 'react-router-dom/Link'

class previewPost extends Component {
  render() {
    let randomRGB = {
      red: Math.random() * 255,
      green: Math.random() * 255,
      blue: Math.random() * 255
    }
    let { red, green, blue } = randomRGB
    let rgb = `rgb(${red},${green},${blue})`

    const { className } = this.props
    const { post } = this.props

    let randomNumber = Math.floor(Math.random() * 1085)

    if(this.props.filler) {
      return <article className={[styles.article, styles.filler].join(' ')}></article>
    }

    return (
      <Link to={post.path ? `posts/${post.path}` : ''} className={[styles.article, ...className || ''].join(' ')} style={{
        // backgroundColor: rgb,
        backgroundImage: post != {} ? `url('https://picsum.photos/225/225/?image=${randomNumber}')` : ''
      }}>
        <div className={styles.articleWrapper}>
          <div className={styles.articleWrapperStats}>
            {post.likes > 0 && <div className={styles.articleWrapperStatsLikes}>
              <Icon iconName='FeatherAlt' />
              <p className={styles.articleWrapperStatsLikesText}>{post.likes}</p>
            </div>}
          </div>
          {post.title && <div className={styles.articleWrapperText}>
            <p className={styles.articleWrapperTextTitle}>
              {post.title}
            </p>
          </div>}
        </div>
      </Link>
    )
  }
}

export default previewPost
