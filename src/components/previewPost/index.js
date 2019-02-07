import React, { Component } from 'react'
import styles from './previewPost.scss'
import { Icon } from '../../components'

class previewPost extends Component {
  render() {
    let randomRGB = {
      red: Math.random() * 255,
      green: Math.random() * 255,
      blue: Math.random() * 255
    }
    let { red, green, blue } = randomRGB
    let rgb = `rgb(${red},${green},${blue})`

    const { title, likes, className } = this.props

    let randomNumber = Math.floor(Math.random() * 1085)

    return (
      <article className={[styles.article, ...className || ''].join(' ')} style={{
        backgroundColor: rgb,
        backgroundImage: `url('https://picsum.photos/225/225/?image=${randomNumber}')`
      }}>
        <div className={styles.articleText}>
          <div className={styles.stats}>
            {likes > 0 && (
              <div className={styles.statsLikes}>
                <Icon iconName='Heart' />
                <p className={styles.statsLikesText}>{likes || 0}</p>
              </div>
            ) || null}
          </div>
          <p className={styles.title}>
            {title || 'This article is about developers'}
          </p>
        </div>
      </article>
    )
  }
}

export default previewPost
