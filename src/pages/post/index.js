import React from 'react'
import App from '../App'
import { Standard, Section } from '../../layouts'
import { PostBanner } from '../../components'

// @inject('store') @observer
class Post extends App {
  render() {
    return (
      <Standard>
        <PostBanner />
        <Section title={'test'}>
          <h3>URL Name = {this.props.match.params.postUrl || 'NONE'}</h3>
        </Section>
      </Standard>
    )
  }
}

export default Post
