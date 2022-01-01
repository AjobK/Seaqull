import React, { Component } from 'react'
import { Icon, PostInfo } from '../../components'
import styles from './postsBlockLarge.scss'
import ReactTooltip from 'react-tooltip'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

@inject('store') @observer
class PostsBlockLarge extends Component {
  constructor(props) {
    super(props)
  }

  bookmarkPost = () => {
    // TODO: Add bookmark functionality
  }

  render() {
    const { post, store } = this.props

    return (
      <div className={ styles.large }>
        <div className={ styles.largeThumbnail }>
          <span
            className={ styles.largeThumbnailBookmark }
            onClick={ this.bookmarkPost }
            data-tip
            data-for={ 'largeBookmarkTooltip' }
          >
            <Icon
              className={ styles.largeThumbnailBookmarkIcon }
              iconName={ 'Bookmark' }
            />
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
            <Link to={ `posts/${post.path}` }>
              <h3 className={ styles.largeThumbnailContentTitle }>{post.title}</h3>
              <div className={ styles.largeThumbnailContentDescription }>
                <p>{post.description}</p>
              </div>
            </Link>
            <div className={ styles.largeThumbnailContentBottom }>
              <PostInfo post={ post } type={ 'light' } />
              <Link to={ `posts/${post.path}` } className={ styles.goTo }>
                <p>
                  Read more
                  <span>{/* UNDERLINE */}</span>
                </p>
                <Icon iconName={ 'ChevronRight' } className={ styles.goToIcon } />
              </Link>
            </div>
          </div>
          <Link to={ `posts/${post.path}` }>
            <img src={ `${ store.defaultData.backendUrlBase }/${ post.thumbnail_attachment.path }` } alt={ 'post' } />
          </Link>
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
