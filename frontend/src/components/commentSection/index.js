import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import Axios from 'axios'

import styles from './commentSection.scss'

import { Section } from '../../layouts'
import { Comment } from '../'
import { CommentForm } from '../'
import { URLUtil } from '../../util/'

@inject('store')
@observer
class CommentSection extends Component {
  constructor(props) {
    super(props)
    this.state = { comments: [] }
  }

  loadComments() {
    const path = URLUtil.getLastPathArgument()
    const url = `http://localhost:8000/api/comment/${path}`

    Axios.get(url)
      .then((response) => {
        // TODO: Forces rerender, but is not the best way to do it... Lack for a better solution
        this.setState({ comments: [] }, () => {
          this.setState({ comments: this.nestComments(response.data) })
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.loadComments()
  }

  onCommentAdd = () => {
    this.loadComments()
  }

  displayCommentForm = () => {
    const { profile } = this.props.store

    if (profile.loggedIn) {
      return <CommentForm onCommentAdd={ this.onCommentAdd } className={ styles.commentForm } />
    }

    return (
      <p className={ styles.loginToComment }>
        <Link to="/login" className={ styles.commentSection__highlightedLink }>
          Log in{ ' ' }
        </Link>
        to comment on this post
      </p>
    )
  }

  nestComments = (commentList) => {
    const commentMap = {}

    commentList.forEach((comment) => {
      commentMap[comment.id] = comment
    })

    if (commentList.length > 0) {
      commentList.forEach((comment) => {
        if (comment.parent_comment_id !== null) {
          const parent = commentMap[comment.parent_comment_id]

          parent.children ? parent.children.push(comment) : (parent.children = [comment])
        }
      })
    }

    const filteredComments = commentList.filter((comment) => {
      return comment.parent_comment_id === null
    })

    return filteredComments
  }

  render() {
    return (
      <div className={ styles.commentSection }>
        <Section noTitle>
          {this.displayCommentForm()}
          {this.state.comments && this.state.comments.length > 0 ? (
            this.state.comments.map((comment) => (
              <Comment key={ comment.id } comment={ comment } onReplyAdd={ this.onCommentAdd } />
            ))
          ) : (
            <p className="noComment">No comments</p>
          )}
        </Section>
      </div>
    )
  }
}

export default CommentSection
