import React, { Component } from 'react'
import styles from './postsPreview.scss'
import Plus from '../../static/plus.svg'

class PostsPreview extends Component {
  render() {
    let arr = []

    for (let i = 1; i <= 8; i++) {
      let randomRGB = {
        red: Math.random() * 255,
        green: Math.random() * 255,
        blue: Math.random() * 255
      }
      let { red, green, blue } = randomRGB
      let rgb = `rgb(${red},${green},${blue})`

      arr.push(
        <article key={i} className={styles.article} style={{ backgroundColor: rgb }}>
          <p className={styles.articleText}>
            {'Article ' + i}
          </p>
        </article>
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
