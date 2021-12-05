import React from 'react'
import App from '../App'
import { Standard, Section } from '../../layouts'
import { observer, inject } from 'mobx-react'
import Axios from 'axios'
import { ProfileBanner, PostsPreview, Loader, ProfileCard } from '../../components'
import styles from './profile.scss'
import ProfileFollowerList from '../../components/profileFollowerList'
import { withRouter } from 'react-router'
import { ProfilePosts } from '../../components'

@inject('store')
@observer
class Profile extends App {
  constructor(props) {
    super(props)

    this.changeFollowerCount = this.changeFollowerCount.bind(this)

    this.state = {
      user: null,
      posts: [],
      likes: [],
      isOwner: false,
      showFollowers: false,
    }
    Axios.defaults.baseURL = this.props.store.defaultData.backendUrl
    this.loadDataFromBackend()
  }

  loadDataFromBackend = () => {
    const { path } = this.props.match.params

    this.fetchProfileData(path || '')
  }

  fetchProfileData(path) {
    Axios.get(`/profile/${path}`, { withCredentials: true })
      .then((response) => {
        this.updateProfile(response.data.profile)
        this.fetchOwnedPosts(this.state.user.username)
        this.setState({ isOwner: response.data.profile.isOwner })
      })
      .then(() => {
        this.fetchLikedPosts(this.state.user.username)
      })
      .catch((e) => {
        const { name, message } = e.toJSON()

        this.props.history.push({
          pathname: '/error',
          state: {
            title: e.response ? e.response.status : name,
            sub: e.response ? e.response.statusText : message
          }
        })
      })
  }

  fetchOwnedPosts(username) {
    Axios.get(`${this.props.store.defaultData.backendUrl}/post/owned-by/${username}`)
      .then((json) => {
        this.setState({ posts: json.data })
      })
      .catch(() => {})
  }

  fetchLikedPosts(username) {
    Axios.get(`${this.props.store.defaultData.backendUrl}/post/liked-by/recent/${username}`)
      .then((json) => {
        this.setState({ likes: json.data })
      })
      .catch(() => {})
  }

  updateProfile(profile) {
    const user = profile

    user.picture = profile.avatar

    this.setState({ user })
  }

  changeFollowerCount(amount) {
    const user = { ...this.state.user }
    user.followerCount += amount
    this.setState({ user })
  }

  openFollowersList = () => {
    if (this.state.user.followerCount > 0) {
      this.setState({
        showFollowers: true
      })
    }
  }

  closeFollowersList = () => {
    this.setState({
      showFollowers: false
    })
  }

  render() {
    const { user, isOwner } = this.state
    const { profile } = this.props.store

    if (!user) {
      return (
        <Standard>
          <Loader />
        </Standard>
      )
    }

    if (this.props.match.params.path != user.username) {
      this.fetchProfileData(this.props.match.params.path)
    }

    return (
      <Standard>
        <ProfileBanner
          changeFollowerCount={ this.changeFollowerCount }
          role={ profile.role }
          user={ user }
          owner={ isOwner && profile.loggedIn }
        />
        <div className={ styles.profileWrapper }>
          <ProfileCard
            user={ user }
            profile={ profile }
            posts={ this.state.posts }
            changeFollowerCount={ this.changeFollowerCount }
            openFollowersList={ this.openFollowersList }
          />
          <div className={ styles.profileContentWrapper }>
            <ProfilePosts posts={ this.state.posts } user={ user } isOwner={ isOwner } profile={ profile } />
            <Section title={ 'LIKED POSTS' }>
              <PostsPreview posts={ this.state.likes } />
            </Section>
            { (this.state.showFollowers && this.state.user.followerCount > 0) &&
              <ProfileFollowerList closeFollowersList={ this.closeFollowersList } user={ this.state.user } />
            }
          </div>
        </div>
      </Standard>
    )
  }
}

export default withRouter(Profile)
