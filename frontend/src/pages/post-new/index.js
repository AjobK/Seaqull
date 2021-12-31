import React from 'react'
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard } from '../../layouts'
import { withRouter } from 'react-router-dom'
import styles from './post.scss'
import URLUtil from '../../util/urlUtil'
import Axios from 'axios'
import { convertFromRaw } from 'draft-js'
import { Loader, PostBanner, PostContent } from '../../components'

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
      <Standard>
        <section className={ styles.postWrapper }>
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
        </section>
      </Standard>
    )
  }
}

export default withRouter(PostNew)
