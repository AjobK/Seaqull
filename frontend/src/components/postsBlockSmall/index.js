import React, { Component } from 'react'
import { Icon } from '../../components'
import { DraftJsUtil, TextUtil, TimeUtil } from '../../util/'
import styles from './postsBlockSmall.scss'
import ReactTooltip from 'react-tooltip'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

@inject('store') @observer
class PostsBlockSmall extends Component {
  constructor(props) {
    super(props)
  }

  bookmarkPost = () => {
    // TODO: Add bookmark functionality
  }

  render() {
    const { post, store } = this.props

    return (
      <div className={ styles.small }>
        <div className={ styles.smallThumbnail }>
          <div className={ styles.smallThumbnailContent }>
            {/* TODO: Remove or add back when categories/tags work */}
            {/* <Link to={ '#' } className={ styles.smallThumbnailContentCategory }>
              <span className={ styles.smallThumbnailContentCategoryBullet }>
                <Icon iconName={ 'Circle' } />
              </span>
              <p>
                Machine learning
                <span></span>
              </p>
            </Link> */}
            <span
              className={ styles.bookmark }
              onClick={ this.bookmarkPost }
              data-tip data-for={ 'smallBookmarkTooltip' }
            >
              <Icon iconName={ 'Bookmark' } />
            </span>
            <ReactTooltip
              id={ 'smallBookmarkTooltip' }
              effect={ 'solid' }
              place={ 'bottom' }
              className={ styles.toolTip }
            >
              Work in progress
            </ReactTooltip>
          </div>
          <Link to={ `posts/${post.path}` } >
            <img src={ `${ store.defaultData.backendUrlBase }/${ post.thumbnail_attachment.path }` } alt={ 'post' } />
          </Link>
        </div>
        <div className={ styles.smallContent }>
          <Link to={ `posts/${post.path}` } className={ styles.smallContentClickable } />
          <div>
            <div>
              <h4 className={ styles.smallContentTitle }>{post.title}</h4>
              { post.description?.length > 0
                ? <p className={ styles.smallContentDescription }>{post.description}</p>
                : <p className={ styles.smallContentDescription }>Hi, check out my post!</p>
              }
            </div>
            <div className={ styles.smallContentBottom }>
              <div className={ styles.smallContentBottomInfo }>
                <div className={ styles.smallContentBottomInfoText }>
                  <span className={ styles.smallContentBottomInfoTextIcon }>
                    <Icon iconName={ 'Stopwatch' } />
                  </span>
                  <p>{ TextUtil.getReadTimeFromText(DraftJsUtil.getRawContentFromData(post.content)) }</p>
                </div>
                <span className={ styles.smallContentBottomInfoBullet }>&bull;</span>
                <div className={ styles.smallContentBottomInfoText }>
                  <p>{TimeUtil.timeAgo(new Date(post.created_at))}</p>
                </div>
              </div>
              <span className={ styles.bookmark } onClick={ this.bookmarkPost }>
                <Icon iconName={ 'Bookmark' } />
              </span>
              <span className={ styles.smallContentBottomGoTo }>
                <Icon iconName={ 'ChevronRight' } />
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PostsBlockSmall
