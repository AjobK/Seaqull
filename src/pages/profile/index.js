import React from 'react'
import App from '../App'
import { Standard, Section } from '../../layouts'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import { UserBanner, PostsPreview } from '../../components'

@inject('store') @observer
class Profile extends App {
  render() {
    const { user } = this.props.store

    if (!user.loggedIn) return <Redirect to='/500'/>

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
          Lorem Ipsum
        </Section>
      </Standard>
    )
  }
}

export default Profile
