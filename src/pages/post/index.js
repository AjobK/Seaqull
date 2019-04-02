import React from 'react'
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard, Section } from '../../layouts'
import { PostBanner, PostHeader, PostSection } from '../../components'

@inject('store') @observer
class Post extends App {
  render() {
    return (
      <Standard>
        <PostBanner />
        <Section title={'Front-End vs. Back-End'}>
          <PostHeader heading={'Visuals are key'}/>
          <PostSection />
          <br/>
          <PostHeader heading={'Understanding colors'}/>
          <PostSection />
        </Section>
      </Standard>
    )
  }
}

export default Post
