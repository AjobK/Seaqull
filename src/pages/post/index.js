import React from 'react'
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard, Section } from '../../layouts'
import { PostBanner, PostContentHeading, PostContentParagraph, InsertContent } from '../../components'

@inject('store') @observer
class Post extends App {
  render() {
    return (
      <Standard>
        <PostBanner />
        <Section title={'Front-End vs. Back-End'}>
          <PostContentHeading value={'Visuals are key'}/>
          <br />
          <PostContentParagraph value={'The importance is visuals is in it\'s essence very simple.'} />
          <br />
          <PostContentHeading value={'Understanding color'} />
          <br />
          <PostContentParagraph value={'To be the master of colors, you have to understand how they work.'} />
          <br />
        </Section>
        <InsertContent/>
      </Standard>
    )
  }
}

export default Post
