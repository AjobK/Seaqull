import React from 'react'
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard } from '../../layouts'
import { withRouter } from 'react-router-dom'
import styles from './post.scss'
import URLUtil from '../../util/urlUtil'
import Axios from 'axios'
import { convertFromRaw } from 'draft-js'
import {
  Button,
  CommentSection,
  Loader,
  PostBanner,
  PostContent,
  PostInfo,
  PostLike,
  ProfileBarSmall,
  DocumentHead
} from '../../components'
import ReactTooltip from 'react-tooltip'
import { popUpData } from '../../components/popUp/popUpData'
import { ToastUtil } from '../../util'
import { toastData } from '../../components/toast/toastData'

@inject('store')
@observer
class Post extends App {
  constructor(props) {
    super(props)

    this.canBanUser = this.props.store.profile.role.toUpperCase() !== 'USER'

    this.postPath = URLUtil.getLastPathArgument()

    this.addedThumbnail = null

    this.state = {
      canceledEdit: false,
      isOwner: false,
      isEditing: false,
      author: {
        display_name: '',
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
    return this.props.isNew
      ? this.loadOwnProfile()
      : this.loadArticle()
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
          display_name: post.profile.display_name,
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
          author: author
        }, this.addViewToDB)
      })
      .catch((error) => {
        let message

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

  loadOwnProfile = () => {
    const { profile } = this.props.store

    this.setState({
      author: {
        display_name: profile.display_name,
        avatarURL: profile.avatarURL,
        path: '/profile/' + profile.display_name,
        title: profile.title
      }
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

      this.setIsEditing(false)
    }
  }

  createPost = async () => {
    const allowedToPost = await this.checkPostTimeout()

    if (!allowedToPost) {
      ToastUtil.createToast(toastData.messages.spamWarning)

      return
    }

    const fd = new FormData()

    fd.append('file', this.addedThumbnail)
    fd.append('title', JSON.stringify(this.state.post.title))
    fd.append('description', JSON.stringify('None'))
    fd.append('content', JSON.stringify(this.state.post.content))

    Axios.post('/post', fd, {
      withCredentials: true, 'content-type': 'multipart/form-data'
    }).then((res) => {
      this.props.history.push(`/posts/${ res.data.path }`)
    })
  }

  updatePost = () => {
    const payload = {
      title: this.state.post.title,
      description: '',
      content: this.state.post.content,
    }

    Axios.put(`/post/${ this.state.post.path }`, payload, { withCredentials: true }).then(() => {
      const { notification } = this.props.store

      notification.setContent(popUpData.messages.updatePostNotification)
    })
  }

  checkPostTimeout = async () => {
    const response = await Axios.get('/post/timeout', { withCredentials: true })

    return response.data.allowedToPost
  }

  onThumbnailAdded = (thumbnail) => {
    this.addedThumbnail = thumbnail
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

    Axios.put(`/post/archive/${ this.postPath }`, {}, { withCredentials: true }).then((_res) => {
      this.props.history.push('/')
    }).catch((_err) => { })
  }

  addViewToDB = () => {
    if (!this.state.isOwner) {

      const payload = {
        path: this.postPath
      }

      Axios.post(`${ this.props.store.defaultData.backendUrl }/post/view`, payload)
    }
  }

  onThumbnailAdded = (thumbnail) => {
    this.addedThumbnail = thumbnail
  }

  setIsEditing = (newValue) => {
    this.setState({
      isEditing: newValue
    })
  }

  enableEdit = () => {
    const { post } = this.state

    this.setIsEditing(true)

    this.initialPost = {
      ...post,
      title: post.title,
      content: post.content
    }
  }

  cancelEdit = () => {
    // TODO:  We did this for a lack of a better solution. This triggers a prop state once enabling us to react
    //        to a change in the parent (for postcontent). On cancelling edit we can revert the content.
    this.setState({
      isEditing: false,
      canceledEdit: true
    }, () => this.setState({ canceledEdit: false }))
  }

  render = () => {
    const { isEditing, isOwner, post, loaded, author, canceledEdit } = this.state
    const { isNew } = this.props

    if (!loaded && !isNew)
      return <Loader />

    return (
      <Standard className={ styles.post }>
        <DocumentHead
          title={ `${ post.title } | @${ author } on Seaqull` }
          description={ post.description ?? post.content }
          image={ post.thumbnail }
        />
        <div className={ styles.postSideWrapper }>
          <div className={ styles.postSideWrapperContent }>
            <div className={ styles.postSide }>
              <div className={ styles.postSideAuthor }>
                <p className={ styles.postSideAuthorHeader }>
                  Written by:
                </p>
                <ProfileBarSmall profile={ author } />
              </div>

              { !isNew && (
                <PostLike
                  likesAmount={ this.state.post.likes.amount || 0 }
                  liked={ this.state.post.likes.userLiked }
                  toggleLike={ this.toggleLike }
                  isOwner={ isOwner }
                />
              )}
            </div>
          </div>
        </div>
        <section className={ styles.postWrapper }>
          { !isNew &&
          <div className={ styles.postWrapperTop }>
            <PostInfo post={ post } theme={ 'dark' } size={ 'large' } withViews fullWidth />
          </div>
          }
          <div className={ styles.postWrapperAuthor }>
            <ProfileBarSmall profile={ author } />
          </div>
          <PostContent
            type={ 'title' }
            // Saves post title with draftJS content
            callBackSaveData={ (data) => {
              post.title = data

              this.setState({ post: post })
            } }
            readOnly={ isNew ? false : (!isEditing || !isOwner) }
            value={ post.title } // Initial no content, should be prefilled by API
          />
          <div className={ styles.postWrapperThumbnail }>
            <PostBanner
              post={ this.state.post }
              isOwner={ isOwner }
              isNew={ isNew }
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
              callBackGetData={ () => this.initialPost?.content }
              canceled={ canceledEdit }
              readOnly={ isNew ? false : !(isEditing && isOwner) }
              value={ post.content } // Initial no content, should be prefilled by API
            />
          </div>

          <div className={ styles.postActionButtons }>
            <div className={ styles.postActionButtonsLeft }>
              {
                isNew &&
                <Button
                  className={ styles.postActionButtonsPublishButton }
                  value={ 'Create' }
                  onClick={ () => this.save(post.path) }
                />
              }
              {
                isOwner && !isEditing && !isNew &&
                <Button
                  className={ styles.postActionButtonsPublishButton }
                  value={ 'Edit' }
                  onClick={ this.enableEdit }
                />
              }
              {
                isOwner && isEditing && !isNew &&
                <Button
                  className={ styles.postActionButtonsPublishButton }
                  value={ 'Save' }
                  onClick={ () => this.save(post.path) }
                />
              }
              {
                isOwner && isEditing && !isNew &&
                <Button
                  className={
                    `${ styles.postActionButtonsPublishButton } ${ styles.postActionButtonsPublishButtonSecondary }`
                  }
                  value={ 'Cancel' }
                  inverted
                  onClick={ this.cancelEdit }
                />
              }
              {
                !isNew && (this.canBanUser || isOwner) && !isEditing &&
                <Button
                  className={
                    `${ styles.postActionButtonsPublishButton } ${ styles.postActionButtonsPublishButtonSecondary }`
                  }
                  value={ 'Delete' }
                  inverted
                  onClick={ this.onDeletePostClicked }
                />
              }
            </div>
            <div className={ styles.postActionButtonsRight }>
              <div className={ styles.postActionButtonsMobile }>
                { !isNew && (
                  <div className={ styles.postActionButtonsMobileLike }>
                    <PostLike
                      likesAmount={ this.state.post.likes.amount || 0 }
                      liked={ this.state.post.likes.userLiked }
                      toggleLike={ this.toggleLike }
                      isOwner={ isOwner }
                    />
                  </div>
                )}
              </div>
            </div>
            <ReactTooltip id={ 'postDeleteTooltip' } effect={ 'solid' } place={ 'left' } className={ styles.toolTip }>
              Delete
            </ReactTooltip>
          </div>
        </section>
        { !isNew && <CommentSection isPostOwner={ this.state.isOwner } /> }
      </Standard>
    )
  }
}

export default withRouter(Post)
