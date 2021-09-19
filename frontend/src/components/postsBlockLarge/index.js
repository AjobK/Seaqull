import React, { Component } from 'react'
import { TimeUtil } from '../../util/'
import { Icon } from '../../components'
import styles from './postsBlockLarge.scss'
import defaultThumbnail from '../../static/images/default-thumbnail.jpg'
import ReactTooltip from 'react-tooltip'

class PostsBlockLarge extends Component {
  constructor(props) {
    super(props)
  }

  bookmarkPost = () => {
    // TODO: Add bookmark functionality
  }

  render() {
    const { post } = this.props

    return (
      <div className={ styles.large }>
        <div className={ styles.largeThumbnail }>
          <span
            className={ styles.largeThumbnailBookmark }
            onClick={ this.bookmarkPost }
            data-tip
            data-for={ 'largeBookmarkTooltip' }
          >
            <Icon iconName={ 'Bookmark' } />
          </span>
          <ReactTooltip
            id={ 'largeBookmarkTooltip' }
            effect={ 'solid' }
            place={ 'bottom' }
            className={ styles.toolTip }
          >
            Work in progress
          </ReactTooltip>
          <div className={ styles.largeThumbnailContent }>
            <a href={ `posts/${post.path}` }>
              <h3 className={ styles.largeThumbnailContentTitle }>{post.title}</h3>
              <div className={ styles.largeThumbnailContentDescription }>
                <p>{post.description}</p>
              </div>
            </a>
            <div className={ styles.largeThumbnailContentBottom }>
              <div className={ styles.largeThumbnailContentBottomInfo }>
                <a href={ '#' } className={ styles.largeThumbnailContentBottomInfoCategory }>
                  <span className={ styles.largeThumbnailContentBottomInfoCategoryBullet }>
                    <Icon iconName={ 'Circle' } />
                  </span>
                  <p>
                    Machine learning
                    <span>{/* UNDERLINE */}</span>
                  </p>
                </a>
                <span className={ styles.largeThumbnailContentBottomInfoBullet }>&bull;</span>
                <div className={ styles.largeThumbnailContentBottomInfoText }>
                  <span className={ styles.largeThumbnailContentBottomInfoTextIcon }>
                    <Icon iconName={ 'Stopwatch' } />
                  </span>
                  <p>{post.readTime}</p>
                </div>
                <span className={ styles.largeThumbnailContentBottomInfoBullet }>&bull;</span>
                <div className={ styles.largeThumbnailContentBottomInfoText }>
                  <p>{TimeUtil.timeAgo(new Date(post.created_at))}</p>
                </div>
              </div>
              <a href={ `posts/${post.path}` } className={ styles.goTo }>
                <p>
                  Read more
                  <span>{/* UNDERLINE */}</span>
                </p>
                <Icon iconName={ 'ChevronRight' } className={ styles.goToIcon } />
              </a>
            </div>
          </div>
          <a href={ `posts/${post.path}` }>
            <img src={ defaultThumbnail } alt={ 'post' } />
          </a>
        </div>

        <a href={ `posts/${post.path}` } className={ styles.largeBottom }>
          <h3 className={ styles.largeBottomTitle }>{post.title}</h3>
          <p className={ styles.largeBottomDescription }>{post.description}</p>
          <span className={ styles.goTo }>
            <p>Read more</p>
            <Icon iconName={ 'ChevronRight' } className={ styles.goToIcon } />
          </span>
        </a>
      </div>
    )
  }
}

export default PostsBlockLarge
