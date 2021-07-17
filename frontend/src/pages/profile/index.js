import React from 'react'
import App from '../App'
import { Standard, Section } from '../../layouts'
import { observer, inject } from 'mobx-react'
import Axios from 'axios'
import Error from '../error'
import styles from './profile.scss'
import { UserBanner, PostsPreview, Statistics, Loader, ProfileInfo } from '../../components'


@inject('store') @observer
class Profile extends App {
  constructor(props) {
    super(props)

    this.state = {
      user: null,
      error: false,
      posts: [],
      likes: [],
      isOwner: false
    }
    Axios.defaults.baseURL = this.props.store.defaultData.backendUrl
    this.loadDataFromBackend()
  }

  loadDataFromBackend = () => {
    const { path } = this.props.match.params

    this.fetchProfileData(path || '')
  }

  fetchProfileData(path) {
    let token = localStorage.getItem('token')

    Axios.get(`/profile/${path}`,  {withCredentials: true})
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
      .catch(() => {
      })
  }

  fetchLikedPosts(username) {
    Axios.get(`${this.props.store.defaultData.backendUrl}/post/liked-by/recent/${username}`)
        .then((json) => {
          this.setState({ likes: json.data })
        })
        .catch(() => {
        })
  }

  calcLevel(cXp) {
    let xp = {
      current: cXp,
      base: 20,
      max: 20
    }

    let level = 1

    for (let i = 1; xp.current > xp.max; i++) {
      xp.current -= xp.max
      xp.max = ~~(xp.max * 1.2)
      level++
    }

    return level
  }

  updateProfile(profile) {
    const user = {
      isOwner: profile.isOwner,
      following: profile.isOwner ? false : profile.following,
      username: profile.username,
      title: profile.title,
      level: this.calcLevel(profile.experience),
      posts: profile.posts,
      banner: profile.banner || '/src/static/dummy/user/banner.jpg',
      picture: profile.avatar || '/src/static/dummy/user/profile.jpg',
      description: profile.description
    }

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

    if (error) {
      return (
        <Error></Error>
      )
    }

    return (
      <Standard>
        <UserBanner role={ profile.role } user={ user } owner={ isOwner && profile.loggedIn } />
        <Section title={ 'DESCRIPTION' }>
          <ProfileInfo user={ user } loggedIn={ profile.loggedIn }/>
        </Section>
        <Section title={ 'CREATED POSTS' }>
          <PostsPreview posts={ this.state.posts } create={ isOwner && profile.loggedIn } />
        </Section>
        <Section title={ 'LIKED POSTS' }>
          <PostsPreview posts={ this.state.likes } />
        </Section>
        <Section title={ 'STATISTICS' }>
          <Statistics />
        </Section>
      </Standard>
    )
  }
}

export default Profile
