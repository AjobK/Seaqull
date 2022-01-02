import React, { Component } from 'react'
import { convertFromRaw } from 'draft-js'
import { PostsBlockLarge } from '..'
import { inject, observer } from 'mobx-react'
import { TextUtil } from '../../util'
import styles from './profilePosts.scss'

@inject('store')
@observer
class ProfilePosts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: props.posts,
    }
  }

  convertPosts(posts) {
    let convertedPosts = []

    posts.forEach((post) => {
      try {
        post.title = this.getRawContentFromPostData(post.title)
        post.readTime = TextUtil.getReadTimeFromText(this.getRawContentFromPostData(post.content))
      } catch (e) {}

      convertedPosts.push(post)
    })

    return convertedPosts
  }

  //TODO: add to util
  getRawContentFromPostData(data) {
    try {
      const parsedText = JSON.parse(data)

      return convertFromRaw(parsedText).getPlainText()
    } catch (e) {
      return data
    }
  }

  render () {
    const posts = this.convertPosts(this.props.posts)

    let arr = []

    posts.forEach((post) => {
      arr.push(<PostsBlockLarge className="profile" post={ post } key={ post.id } />)
    })

    return (
      <section className={ styles.wrapper }>
        <div className={ styles.profilePosts }>
          {arr}
        </div>
      </section>
    )
  }
}

export default ProfilePosts
