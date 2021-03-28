import React from 'react'
import App from '../App'
import { Standard, Section } from '../../layouts'
import { observer, inject } from 'mobx-react'
import styles from './profile.scss'
import { UserBanner, PostsPreview, Statistics, Loader, ProfileInfo } from '../../components'
import Axios from 'axios'
import Error from '../error'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faSave } from '@fortawesome/free-solid-svg-icons'


@inject('store') @observer
class Profile extends App {

  constructor(props) {
    super(props)

    this.state = {
      user: null,
      error: false,
      posts: [],
      editing: false,
      icon: faEdit
    }
    Axios.defaults.baseURL = this.props.store.defaultData.backendUrl
    this.loadDataFromBackend()
  }

  loadDataFromBackend = () => {
    const { path } = this.props.match.params

    this.fetchProfileData(path || '')
    // this.fetchOwnedPosts(this.state.username)
  }

  fetchProfileData(path) {
    let token = localStorage.getItem('token')

    Axios.get(`/profile/${path}`,  {withCredentials: true})
      .then((response) => {
        this.updateProfile(response.data.profile)
      })
      .then(() => {
        this.fetchOwnedPosts(this.state.user.username)
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
        // this.setState({ error: true })
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
      picture: profile.avatar || '/src/static/dummy/user/profile.jpg',
      description: profile.description
    }

    this.setState({ user })
  }

  changeEditingState() {
    if (!this.state.editing) {
      this.setState({
        editing: true,
        icon: faSave
      })
    } else {
      this.saveNewDescription()
      this.setState({
        editing: false,
        icon: faEdit
      })
    }  
  }

  saveNewDescription = () => {
    const payload = {
      username: this.state.user.username,
      description: this.state.user.description
    }

    Axios.put('/profile', payload, {withCredentials: true})
  }

  render() {
    const { user, error } = this.state

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
    let icon
    if(this.state.user.isOwner){
      icon = <FontAwesomeIcon icon={this.state.icon} 
      className={styles.editIcon} 
      onClick={() => this.changeEditingState()}
      size='lg'
      />
    }

    return (
      <Standard>
        <UserBanner user={user} />
        <Section title={'DESCRIPTION'}>
          <ProfileInfo startEditing={this.state.editing} user={user}/>
          {icon}
        </Section>
        <Section title={'CREATED POSTS'}>
          <PostsPreview posts={this.state.posts} create={true} />
        </Section>
        <Section title={'LIKED POSTS'}>
          <PostsPreview posts={this.state.posts} />
        </Section>
        <Section title={'STATISTICS'}>
          <Statistics />
        </Section>
      </Standard>
    )
  }
}

export default Profile
