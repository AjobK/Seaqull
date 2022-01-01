import React, { Component } from 'react'
import { PostsBlockLarge, PostsBlockSmall } from '../../components'
import { DraftJsUtil } from '../../util/'
import styles from './postsBlock.scss'

class PostsBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
    this.convertPosts()
  }

  convertPosts() {
    let convertedPosts = []

    this.props.posts.forEach((post) => {
      try {
        post.title = DraftJsUtil.getRawContentFromData(post.title)
      } catch (e) {}

      convertedPosts.push(post)
    })

    this.setState({
      posts: convertedPosts,
    })
  }

  render() {
    return (
      <div className={ styles.postsBlock }>
        {this.state.posts[0] && (
          <div className={ styles.large1 }>
            <PostsBlockLarge post={ this.state.posts[0] } />
          </div>
        )}
        <div className={ `${styles.small} ${styles.small1}` }>
          {this.state.posts[1] && <PostsBlockSmall post={ this.state.posts[1] } />}
          {this.state.posts[2] && <PostsBlockSmall post={ this.state.posts[2] } />}
        </div>
        <div className={ `${styles.small} ${styles.small2}` }>
          {this.state.posts[3] && <PostsBlockSmall post={ this.state.posts[3] } />}
          {this.state.posts[4] && <PostsBlockSmall post={ this.state.posts[4] } />}
        </div>
        {this.state.posts[5] && (
          <div className={ styles.large2 }>
            <PostsBlockLarge post={ this.state.posts[5] } />
          </div>
        )}
      </div>
    )
  }
}

export default PostsBlock
