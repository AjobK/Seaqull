import React, { Component } from 'react'
import { convertFromRaw } from 'draft-js'
import { PostsBlockLarge } from '..'
import { Link } from 'react-router-dom'
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

    const canCreate = this.props.profile.loggedIn && this.props.isOwner

    let arr = []

    posts.forEach((post) => {
      arr.push(<PostsBlockLarge post={ post } key={ post.id } />)
    })

    return (
      <section className={ styles.wrapper }>
        {/* for testing, will be removed in production */}
        {canCreate && (
          <Link to="/new-post" className={ styles.add }>
            <p>Create</p>
          </Link>
        )}
        <div className={ styles.profilePosts }>
          {arr}
        </div>
      </section>
    )
  }
}

export default ProfilePosts
