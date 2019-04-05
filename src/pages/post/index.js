import React from 'react'
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard, Section } from '../../layouts'
import { PostBanner, PostSection, PostContentBlock, PostContentHeading } from '../../components'

@inject('store') @observer
class Post extends App {
  render() {
    return (
      <Standard>
        <PostBanner />
        <Section title={'Front-End vs. Back-End'}>
          <PostContentHeading value={'Visuals are key'}/>
          <br />
          <PostContentHeading value={'Understanding color'} />
          <br />
          <PostContentBlock />
          <br />
          <PostContentBlock />
          <br />
          <PostContentBlock />
          <br/>
          <PostSection />
        </Section>
      </Standard>
    )
  }
}

export default Post
