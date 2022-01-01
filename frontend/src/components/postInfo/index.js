import React, { Component } from 'react'
import styles from './postInfo.scss'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { TextUtil, TimeUtil, DraftJsUtil } from '../../util/'
import { Icon, PostViews } from '../index'

@inject('store')
@observer
class PostInfo extends Component {
  render() {
    let { post, type, withViews } = this.props

    if (!type) type = 'light'

    const style = styles[`postInfo${ type.charAt(0).toUpperCase() + type.slice(1) }`]

    return (
      <div className={ `${ styles.postInfo } ${ style }` }>
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
            { TextUtil.getReadTimeFromText(DraftJsUtil.getRawContentFromData(post.content)) }
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
