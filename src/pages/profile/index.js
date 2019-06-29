import React from 'react'
import App from '../App'
import { Standard, Section } from '../../layouts'
import { observer, inject } from 'mobx-react'
import { UserBanner, PostsPreview, Statistics } from '../../components'
import Axios from 'axios'
import Error from "../error";

@inject('store') @observer
class Profile extends App {

  constructor(props) {
    super(props);

    const user = {
      isOwner: false,
      username: '',
      title: '',
      level: 0,
      posts: [],
      banner: '/src/static/dummy/user/banner.jpg',
      picture: '/src/static/dummy/user/profile.jpg'
    }

    this.state = {
      user: user,
      error: false
    }
  }

  componentDidMount() {
    const { path } = this.props.match.params
    const { user } = this.props.store

    if(user.path === path) {
      this.updateProfile(user);
    }
    else {
      this.fetchProfileData(path);
    }
  }

  fetchProfileData(path) {
    Axios.get(`${this.props.store.defaultData.backendUrl}/api/profile/${path}`)
      .then((response) => {
        this.updateProfile(response.data.profile)
      })
      .catch((err) => {
          console.log(err);
          this.setState({ error: true })
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
      banner: '/src/static/dummy/user/banner.jpg',
      picture: '/src/static/dummy/user/profile.jpg'
    }

    this.setState({ user })
  }

  render() {
    if(this.state.error) {
        return (
            <Error></Error>
        )
    }

    return (
      <Standard>
        <UserBanner user={this.state.user}/>
        <Section title={'CREATED POSTS'}>
          <PostsPreview posts={this.state.user.posts} create={this.state.user.isOwner} />
        </Section>
        <Section title={'LIKED POSTS'}>
          <PostsPreview posts={this.state.user.posts} />
        </Section>
        <Section title={'STATISTICS'}>
          <Statistics />
        </Section>
      </Standard>
    )
  }
}

export default Profile
