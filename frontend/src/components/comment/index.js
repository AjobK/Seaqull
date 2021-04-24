import React, { Component } from 'react'
import styles from './comment.scss'
import { Link } from 'react-router-dom'
import {Editor, EditorState, convertFromRaw, ContentState} from 'draft-js'
import { CommentForm, CommentChildren, Icon } from '../'

import TimeUtil from '../../util/timeUtil'

class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: props.comment.content != null
                ? EditorState.createWithContent(convertFromRaw(JSON.parse(props.comment.content)))
                : EditorState.createEmpty(),
            isReplying: false,
            showReplies: false
        }

        if (this.props.comment && this.props.comment.parent_comment_id) {
            this.isReply = true;
        }
    }

    displayAvatar = () => {
        if (!this.isReply) {
            return(
                <div className={styles.comment__avatar}>
                    {/* TODO: replace profile image */}
                    <img src={require('../../static/dummy/user/profile.jpg')} className={styles.comment__avatarPicture} />
                    <div className={styles.comment__avatarBadge}>
                        {this.props.comment.profile.experience > 0 ? this.props.comment.profile.experience/1000 : 0 }
                    </div>
                </div>
            )
        }
    }

    displayCommentForm = () => {
        if(!this.isReply && this.state.isReplying) {
            return (
                <div className={styles.comment__replyForm}>
                    <CommentForm type="reply" parent_comment={ this.props.comment.id } onCommentAdd={ this.onReplyAdd }/>
                </div>
            )
        }
    }

    onReplyAdd = () => {
        this.props.onReplyAdd()
    }

    onReplyClick = () => {
        this.setState({ isReplying: !this.state.isReplying })
    }

    displayReplyButton = () => {
        if(!this.isReply) {
            return (
                <div className={styles.comment__replyButton}>
                    <Icon iconName={'Reply'} className={styles.comment__replyButtonIcon} onClick={this.onReplyClick}/>
                </div>
            )
        }
    }

    render() {
        const { comment } = this.props
        const { showReplies } = this.state

        if (comment) {
            return (
                <article className={`${styles.comment} ${this.isReply && styles.reply}`}>
                    <div className={styles.comment__body}>
                        {this.displayAvatar()}
                        <div className={styles.comment__main}>
                            <div className={styles.comment_content}>
                                <div className={styles.comment__header}>
                                    <div className={styles.comment__headerAuthor}>
                                    <Link to={`/profile/${comment.profile.display_name}`} className={styles.comment__headerAuthor}>
                                        {comment.profile.display_name}
                                    </Link>
                                    </div>
                                    <div className={styles.comment__headerPublishedTime}>
                                        {TimeUtil.timeAgo(new Date(comment.created_at))}
                                    </div>
                                </div>
                                <div className={styles.comment__content}>
                                    <Editor editorState={this.state.editorState} readOnly={true}/>
                                </div>
                            </div>
                            <div className={styles.comment__interactive}>
                                {
                                    (comment.children && comment.children.length > 0) && 
                                    <button onClick={() => this.setState({ showReplies: !showReplies })} className={ showReplies && styles.showReplies }>
                                        { comment.children.length } repl{comment.children.length > 1 ? 'ies' : 'y'}
                                        <span>{/* Underline animation */}</span>
                                    </button> 
                                }
                                { this.displayReplyButton() }
                            </div>
                        </div>
                    </div>
                    { this.displayCommentForm() }
                    { showReplies && <CommentChildren commentChildren={ comment.children } /> }
                </article>
            )
        }
    }
}

export default Comment
