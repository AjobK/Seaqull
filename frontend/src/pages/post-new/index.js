import React from 'react'
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard } from '../../layouts'
import { withRouter } from 'react-router-dom'
import styles from './post.scss'
import URLUtil from '../../util/urlUtil'
import Axios from 'axios'
import { convertFromRaw } from 'draft-js'
import { Button, CommentSection, Icon, Loader, PostBanner, PostContent, PostLike, PostViews } from '../../components'
import ReactTooltip from 'react-tooltip'
import { popUpData } from '../../components/popUp/popUpData'

@inject('store')
@observer
class PostNew extends App {
  constructor(props) {
    super(props)

    this.canBanUser = this.props.store.profile.role !== 'User' && this.props.store.profile.role !== 'user'

    this.postPath = URLUtil.getLastPathArgument()

    this.addedThumbnail = null

    this.state = {
      isOwner: true,
      isEditing: true,
      author: {
        name: '',
        bannerURL: '',
        avatarURL: '',
        path: '/profile/',
        title: ''
      },
      loaded: false,
      post: {
        title: '',
        description: '',
        content: '',
        path: '',
        likes: {
          amount: 0,
          userLiked: false
        }
      }
    }
  }

  componentDidMount = () => {
    if (!this.props.new) return this.loadArticle()
  }

  loadArticle = () => {
    const { defaultData } = this.props.store

    Axios.get(`${ defaultData.backendUrl }/post/${ this.postPath }`, { withCredentials: true })
      .then((res) => {
        const { post, likes, isOwner } = res.data
        let newPost

        newPost = {
          ...post,
          path: this.postPath,
          likes: {
            amount: likes.amount,
            userLiked: likes.userLiked
          }
        }

        try {
          newPost = {
            ...newPost,
            title: convertFromRaw(JSON.parse(post.title)),
            content: convertFromRaw(JSON.parse(post.content)),
          }
        } catch (e) {

        }

        let author = {
          name: post.profile.display_name,
          bannerURL: '/src/static/dummy/user/banner.jpg',
          avatarURL: post.profile.avatar_attachment
            ? `${ defaultData.backendUrlBase }/${ post.profile.avatar_attachment }`
            : '/src/static/dummy/user/profile.jpg',
          path: `/profile/${ post.profile.display_name }`,
          title: post.profile.title || 'No title'
        }

        this.post = newPost

        this.setState({
          post: newPost,
          loaded: true,
          isOwner: isOwner,
          isEditing: true,
          author: author
        }, this.addViewToDB)
      })
      .catch((error) => {
        let { name, message } = error.toJSON()

        if (error?.response?.data?.message) {
          message = error.response.data.message
        } else if (error?.response?.statusText) {
          message = error.response.statusText
        }

        this.props.history.push({
          pathname: '/error',
          state: {
            title: error.response ? error.response.status : name,
            sub: message
          }
        })
      })
  }

  toggleLike = () => {
    // Toggles liked state for all like components
    let newState = this.state

    // Increment/decrement likes locally
    let newLikesAmount

    if (this.state.post.likes.userLiked && newState.post.likes.amount > 0) {
      newLikesAmount = this.state.post.likes.amount - 1
    } else {
      newLikesAmount = this.state.post.likes.amount + 1
    }

    newState.post.likes.amount = newLikesAmount
    this.state.post.likes.userLiked = !this.state.post.likes.userLiked

    this.setState(newState)
  }

  save = (path = null) => {
    Axios.defaults.baseURL = this.props.store.defaultData.backendUrl

    if (!path) {
      this.createPost()
    } else if (typeof path == 'string') {
      this.updatePost()
    }
  }

  createPost = () => {
    const fd = new FormData()

    fd.append('file', this.addedThumbnail)
    fd.append('title', JSON.stringify(this.state.post.title))
    fd.append('description', JSON.stringify('None'))
    fd.append('content', JSON.stringify(this.state.post.content))

    Axios.post('/post', fd, {
      withCredentials: true, 'content-type': 'multipart/form-data'
    }).then((res) => {
      this.props.history.push(`/posts/${res.data.path}`)
    })
  }

  updatePost = () => {
    const payload = {
      title: this.state.post.title,
      description: 'None',
      content: this.state.post.content,
    }

    Axios.put(`/post/${this.state.post.path}`, payload, { withCredentials: true }).then(() => {
      const { notification } = this.props.store

      notification.setContent(popUpData.messages.updatePostNotification)
    })
  }

  onDeletePostClicked = () => {
    const { notification } = this.props.store

    notification.setContent(popUpData.messages.deletePostConfirmation)

    notification.setActions([
      {
        ...popUpData.actions.cancel,
        action: () => { notification.close() }
      },
      {
        ...popUpData.actions.confirmWithText,
        action: () => {
          this.deletePost()
          notification.close()
        }
      }
    ])
  }

  deletePost = () => {
    Axios.defaults.baseURL = this.props.store.defaultData.backendUrl

    Axios.put(`/post/archive/${this.postPath}`, {}, { withCredentials: true }).then((_res) => {
      this.props.history.push('/')
    }).catch((_err) => { })
  }

  addViewToDB = () => {
    if (!this.state.isOwner) {
      Axios.defaults.baseUrl = this.props.store.defaultData.backendUrl

      const payload = {
        path: this.postPath
      }

      Axios.post('api/post/view', payload)
    }
  }

  onThumbnailAdded = (thumbnail) => {
    this.addedThumbnail = thumbnail
  }

  render = () => {
    const { isEditing, isOwner, post, loaded } = this.state

    if (!loaded && !this.props.new)
      return <Loader />

    return (
      <Standard className={ styles.post }>
        <div className={ styles.postSide }>
          <div>Author</div>
          <PostLike
            likesAmount={ this.state.post.likes.amount || 0 }
            liked={ this.state.post.likes.userLiked }
            toggleLike={ this.toggleLike }
            isOwner={ isOwner }
          />
        </div>
        <section className={ styles.postWrapper }>
          { !this.props.new &&
          // TODO Replace this
          <div className={ styles.likePostWrapper }>
            <PostViews />
          </div>
          }
          <PostContent
            type={ 'title' }
            // Saves post title with draftJS content
            callBackSaveData={ (data) => {
              post.title = data

              this.setState({ post: post })
            } }
            readOnly={ !isOwner || !isEditing }
            value={ post.title } // Initial no content, should be prefilled by API
          />
          <PostContent
            type={ 'description' }
            // Saves post description with draftJS content
            callBackSaveData={ (data) => {
              post.title = data

              this.setState({ post: post })
            } }
            readOnly={ !isOwner || !isEditing }
            value={ post.description } // Initial no content, should be prefilled by API
          />
          <div className={ styles.postWrapperThumbnail }>
            <PostBanner
              post={ this.state.post }
              isOwner={ isOwner }
              isNew={ this.props.new }
              onThumbnailAdded={ this.onThumbnailAdded }
            />
          </div>
          <div className={ styles.postWrapperContent }>
            <PostContent
              type={ 'content' }
              // Saves post content with draftJS content
              callBackSaveData={ (data) => {
                post.content = data

                this.setState({ post: post })
              } }
              readOnly={ !isOwner || !isEditing }
              value={ post.content } // Initial no content, should be prefilled by API
            />
          </div>

          <div className={ styles.postActionButtons }>
            <div className={ styles.postActionButtonsLeft }>
              {
                isOwner && this.props.new &&
                <Button
                  className={ [styles.publishButton, /* isPublished ? styles.published : */''].join(' ') }
                  value={ 'Create' }
                  onClick={ () => this.save(post.path) }
                />
              }
              {
                isOwner && isEditing && !this.props.new &&
                <Button
                  className={ [styles.publishButton, /* isPublished ? styles.published : */''].join(' ') }
                  value={ 'Update' }
                  onClick={ () => this.save(post.path) }
                />
              }
            </div>
            <div className={ styles.postActionButtonsRight }>
              { !this.props.new && (this.canBanUser || isOwner) &&
              <span
                className={ styles.delete }
                data-tip data-for={ 'postDeleteTooltip' }
                onClick={ this.onDeletePostClicked }
              >
                <Icon iconName={ 'Trash' } />
              </span>
              }
            </div>
            <ReactTooltip id={ 'postDeleteTooltip' } effect={ 'solid' } place={ 'left' } className={ styles.toolTip }>
              Delete
            </ReactTooltip>
          </div>
        </section>
        { !this.props.new && <CommentSection isPostOwner={ this.state.isOwner } /> }
      </Standard>
    )
  }
}

export default withRouter(PostNew)
