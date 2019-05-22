import React from 'react'
import App from '../App'
import { Standard, Section } from '../../layouts'
import { observer, inject } from 'mobx-react'
import { UserBanner, PostsPreview, Statistics } from '../../components'
import Axios from 'axios'

@inject('store') @observer
class Profile extends App {

  componentDidMount() {
    const { uid } = this.props.match.params

    Axios.get(`${this.props.store.defaultData.backendUrl}/api/profile/${uid}`)
      .then((response) => {
        this.updateProfile(response.data.profile)
      })
  }

  updateProfile(profile) {
    const { user } = this.props.store

    user.setName(profile.name)
    user.setTitle(profile.title)
    user.setLevel(profile.exp || 1)
  }

  render() {
    return (
      <Standard>
        <UserBanner />
        <Section title={'CREATED POSTS'}>
          <PostsPreview create />
        </Section>
        <Section title={'LIKED POSTS'}>
          <PostsPreview />
        </Section>
        <Section title={'STATISTICS'}>
          <Statistics />
        </Section>
      </Standard>
    )
  }
}

export default Profile
