import React from 'react'
import App from '../App'
import { Standard, Section } from '../../layouts'
import { PostBanner, PostHeader } from '../../components'

// @inject('store') @observer
class Post extends App {
  render() {
    return (
      <Standard>
        <PostBanner />
        <Section title={'Front-End vs. Back-End'}>
          <PostHeader heading={'Visuals are key'}/>
        </Section>
      </Standard>
    )
  }
}

export default Post
