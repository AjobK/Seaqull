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
        <Section title={props => <PostHeader {...props.postUrl || 'NONE'}/>}>
          <h3>De Article url naam is {this.props.match.params.postUrl || 'NONE'}</h3>
        </Section>
      </Standard>
    )
  }
}

export default Post
