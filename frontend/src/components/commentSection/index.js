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
    this.state = { isPostOwner: props.isPostOwner, comments: [] }
  }

  loadComments() {
    const path = URLUtil.getLastPathArgument()
    const { backendUrl } = this.props.store.defaultData
    const postCommentsUrl = `${ backendUrl }/comment/${ path }/${ this.props.store.profile.loggedIn ? '' : 'no-login' }`

    Axios.get(postCommentsUrl, { withCredentials: true })
      .then((response) => {
        // TODO: Forces rerender, but is not the best way to do it... Lack for a better solution
        this.setState({ comments: [] }, () => {
          response.data.forEach((element) => {
            const comment = element.comment
            comment.likes = {
              commentLikes: element.commentLikePayload,
              profileHasLiked: element.profileHasLikedComment,
              length: element.commentLikePayload.length
            }

            const comments = this.state.comments
            comments.push(comment)
            this.setState({
              comments: this.nestComments(comments)
            })
          })
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

          if (parent) {
            parent.children ? parent.children.push(comment) : (parent.children = [comment])
          }
        }
      })
    }

    const filteredComments = commentList.filter((comment) => {
      return comment.parent_comment_id === null
    })

    const pinnedUserComments = []
    const unpinnedUserComments = []
    const pinnedComments = []
    const unpinnedComments = []

    filteredComments.forEach((comment) => {
      if (comment.profile.display_name === this.props.store.profile.display_name) {
        if (comment.is_pinned) {
          pinnedUserComments.push(comment)
        } else {
          unpinnedUserComments.push(comment)
        }
      } else if (comment.is_pinned) {
        pinnedComments.push(comment)
      } else {
        unpinnedComments.push(comment)
      }
    })

    const filteredAndSortedComments = [
      ...this.sortCommentsByDate(pinnedUserComments),
      ...this.sortCommentsByDate(unpinnedUserComments),
      ...this.sortCommentsByDate(pinnedComments),
      ...this.sortCommentsByDate(unpinnedComments)
    ]

    return filteredAndSortedComments
  }

  sortCommentsByDate = (unsortedComments) => (
    unsortedComments.sort((currentComment, nextComment) => {
      if (currentComment.likes.length === nextComment.likes.length) {
        return nextComment.created_at - currentComment.created_at
      }

      return nextComment.likes.length - currentComment.likes.length
    })
  )

  render() {
    return (
      <div className={ styles.commentSection }>
        <Section noTitle>
          {this.displayCommentForm()}
          {this.state.comments && this.state.comments.length > 0 ? (
            this.state.comments.map((comment) => (
              <Comment
                key={ comment.id }
                isPostOwner={ this.state.isPostOwner }
                comment={ comment }
                onReplyAdd={ this.onCommentAdd }
              />
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
