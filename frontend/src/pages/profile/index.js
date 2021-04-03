import React from 'react'
import App from '../App'
import { Standard, Section } from '../../layouts'
import { observer, inject } from 'mobx-react'
import { UserBanner, PostsPreview, Statistics, Loader } from '../../components'
import Axios from 'axios'
import Error from '../error'

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

    this.loadDataFromBackend()
  }

  loadDataFromBackend = () => {
    const { path } = this.props.match.params

    this.fetchProfileData(path || '')
    // this.fetchOwnedPosts(this.state.username)
  }

  fetchProfileData(path) {
    Axios.get(`${this.props.store.defaultData.backendUrl}/profile/${path}`,  {withCredentials: true})
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
      username: profile.username,
      title: profile.title,
      level: this.calcLevel(profile.experience),
      posts: profile.posts,
      banner: profile.banner || '/src/static/dummy/user/banner.jpg',
      picture: profile.avatar || '/src/static/dummy/user/profile.jpg'
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
        <UserBanner user={user} />
        <Section title={'CREATED POSTS'}>
          <PostsPreview posts={this.state.posts} create={isOwner && profile.loggedIn} />
        </Section>
        <Section title={'LIKED POSTS'}>
          <PostsPreview posts={this.state.likes} />
        </Section>
        <Section title={'STATISTICS'}>
          <Statistics />
        </Section>
      </Standard>
    )
  }
}

export default Profile
