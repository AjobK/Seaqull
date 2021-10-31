import React, { Component } from 'react'
import styles from './previewPost.scss'
import { Icon } from '../../components'
import Link from 'react-router-dom/Link'

class previewPost extends Component {
  render() {
    let { post, className } = this.props

    try {
      // DraftJS content and regular text
      post.title = JSON.parse(post.title).blocks[0].text
    } catch (e) { }

    if (this.props.filler) {
      return <article className={ [styles.article, styles.filler].join(' ') }></article>
    }

    return (
      <Link
        to={ post.path ? `/posts/${post.path}` : '#' }
        className={ [styles.article, ...className || ''].join(' ') }
        style={ {
          backgroundImage: `url(${ post.thumbnail })`
        } }>
        <div className={ styles.articleWrapper }>
          <div className={ styles.articleWrapperStats }>
            { post.likes > 0 &&
              <div className={ styles.articleWrapperStatsLikes }>
                <Icon iconName='FeatherAlt' />
                <p className={ styles.articleWrapperStatsLikesText }>
                  {post.likes}
                </p>
              </div>
            }
          </div>
          { post.title &&
            <div className={ styles.articleWrapperText }>
              <p className={ styles.articleWrapperTextTitle }>
                {post.title}
              </p>
            </div>
          }
        </div>
      </Link>
    )
  }
}

export default previewPost
