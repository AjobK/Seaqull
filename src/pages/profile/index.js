import React from 'react'
import App from '../App'
import { Standard, Section } from '../../layouts'
import { observer, inject } from 'mobx-react'
import { UserBanner, PostsPreview, Statistics } from '../../components'

@inject('store') @observer
class Profile extends App {

  componentDidMount() {
    //const { uid } = this.props.match.params
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
