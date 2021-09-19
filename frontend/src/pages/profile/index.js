import React from 'react'
import App from '../App'
import { Standard, Section } from '../../layouts'
import { observer, inject } from 'mobx-react'
import Axios from 'axios'
import Error from '../error'
import { Icon, UserBanner, PostsPreview, Statistics, Loader, ProfileInfo } from '../../components'
import styles from './profile.scss'

@inject('store')
@observer
class Profile extends App {
  constructor(props) {
    super(props)

    this.changeFollowerCount = this.changeFollowerCount.bind(this)

    this.state = {
      user: null,
      error: false,
      posts: [],
      likes: [],
      isOwner: false,
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
      .catch(() => {
        this.setState({ error: true })
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

    user.banner = user.banner || '/src/static/dummy/user/banner.jpg'
    user.picture = user.picture || '/src/static/dummy/user/profile.jpg'

    this.setState({ user })
  }

  changeFollowerCount(amount) {
    const user = this.state.user
    user.followerCount += amount
    this.setState({ user })
  }

  render() {
    const { user, error, isOwner } = this.state
    const { profile } = this.props.store

    if (!user && !error) {
      return (
        <Standard>
          <Loader />
        </Standard>
      )
    }

    if (this.props.match.params.path != user.username) {
      this.fetchProfileData(this.props.match.params.path)
    }

    if (error) {
      return <Error></Error>
    }

    return (
      <Standard>
        <UserBanner
          changeFollowerCount={ this.changeFollowerCount }
          role={ profile.role }
          user={ user }
          owner={ isOwner && profile.loggedIn }
        />
        <section className={ [styles.infoWrapper] }>
          <div className={ [styles.tempFollowerIndicator] }>
            <Icon iconName={ 'UserFriends' } />
            <p>
              {user.followerCount} follower{user.followerCount === 1 ? '' : 's'}{' '}
            </p>
          </div>
        </section>
        <Section title={ 'DESCRIPTION' }>
          <ProfileInfo user={ user } loggedIn={ profile.loggedIn } />
        </Section>
        <Section title={ 'CREATED POSTS' }>
          <PostsPreview posts={ this.state.posts } create={ isOwner && profile.loggedIn } />
        </Section>
        <Section title={ 'LIKED POSTS' }>
          <PostsPreview posts={ this.state.likes } />
        </Section>
        <Section title={ 'STATISTICS' }>
          <Statistics statisticsData={ { views: 0, likes: 0, posts: 0 } } />
        </Section>
      </Standard>
    )
  }
}

export default Profile
