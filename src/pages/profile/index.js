import React from 'react'
import App from '../App'
import { Standard, Section } from '../../layouts'
import { observer, inject } from 'mobx-react'
import { UserBanner, PostsPreview, Statistics } from '../../components'
import Axios from 'axios'

@inject('store') @observer
class Profile extends App {

  constructor(props) {
    super(props);
    const { user } = this.props.store

    this.state = {
      user: user
    }
  }

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

    this.setState({ user: user })
  }

  render() {
    return (
      <Standard>
        <UserBanner user={this.state.user}/>
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
