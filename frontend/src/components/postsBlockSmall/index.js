import React, { Component } from 'react'
import { Icon } from '../../components'
import { TimeUtil } from '../../util/'
import styles from './postsBlockSmall.scss'
import defaultThumbnail from '../../static/images/default-thumbnail.jpg'
import ReactTooltip from 'react-tooltip'

class PostsBlockSmall extends Component {
  constructor(props) {
    super(props)
  }

  bookmarkPost = () => {
    // TODO: Add bookmark functionality
  }

  render() {
    const { post } = this.props

    return (
      <div className={ styles.small }>
        <div className={ styles.smallThumbnail }>
          <div className={ styles.smallThumbnailContent }>
            <a href={ '#' } className={ styles.smallThumbnailContentCategory }>
              <span className={ styles.smallThumbnailContentCategoryBullet }>
                <Icon iconName={ 'Circle' } />
              </span>
              <p>
                Machine learning
                <span>{/* UNDERLINE */}</span>
              </p>
            </a>
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
          <a href={ `posts/${post.path}` }>
            <img src={ defaultThumbnail } alt={ 'post' } />
          </a>
        </div>
        <div className={ styles.smallContent }>
          <a href={ `posts/${post.path}` } className={ styles.smallContentClickable }></a>
          <div>
            <div>
              <h4 className={ styles.smallContentTitle }>{post.title}</h4>
              <p className={ styles.smallContentDescription }>{post.description}</p>
            </div>
            <div className={ styles.smallContentBottom }>
              <div className={ styles.smallContentBottomInfo }>
                <div className={ styles.smallContentBottomInfoText }>
                  <span className={ styles.smallContentBottomInfoTextIcon }>
                    <Icon iconName={ 'Stopwatch' } />
                  </span>
                  <p>{post.readTime}</p>
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
