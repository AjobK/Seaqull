import React, { Component } from 'react'
import styles from './postInfo.scss'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { DraftJsUtil, TextUtil, TimeUtil } from '../../util/'
import { Icon, PostViews } from '../index'

@inject('store')
@observer
class PostInfo extends Component {
  render() {
    let { post, types, withViews } = this.props

    if (!types) types = ['light', 'small']
    const typeStyles = []

    types.forEach((type) => {
      typeStyles.push(styles[`postInfo${ type.charAt(0).toUpperCase() + type.slice(1) }`])
    })

    const getPostReadTime = () => {
      let content

      if (post.content.blocks) {
        content = DraftJsUtil.getRawContentFromData(post.content)
      } else {
        try {
          content = post.content.getPlainText()
        } catch (e) {
          content = post.content
        }
      }

      return TextUtil.getReadTimeFromText(content)
    }

    return (
      <div className={ `${ styles.postInfo } ${ typeStyles }` }>
        <Link to={ '#' } className={ styles.postInfoCategory }>
          <span className={ styles.postInfoCategoryBullet }>
            <Icon iconName={ 'Circle' } />
          </span>
          <p>
            Machine learning
            <span>{/* UNDERLINE */}</span>
          </p>
        </Link>
        { withViews && (
          <div className={ styles.postInfoViews }>
            <span className={ styles.postInfoBullet }>&bull;</span>
            <PostViews />
          </div>
        ) }
        <span className={ styles.postInfoBullet }>&bull;</span>
        <div className={ styles.postInfoText }>
          <span className={ styles.postInfoTextIcon }>
            <Icon iconName={ 'Stopwatch' } />
          </span>
          <p>
            { getPostReadTime() }
          </p>
        </div>
        <span className={ styles.postInfoBullet }>&bull;</span>
        <div className={ styles.postInfoText }>
          <p>{ TimeUtil.timeAgo(new Date(post.created_at)) }</p>
        </div>
      </div>
    )
  }
}

export default PostInfo
