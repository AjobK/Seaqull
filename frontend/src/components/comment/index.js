import React, { Component } from 'react'
import styles from './comment.scss'
import { Link } from 'react-router-dom'
import {Editor, EditorState, convertFromRaw, ContentState} from 'draft-js'
import { CommentForm, CommentChildren } from '../'

import TimeUtil from '../../util/timeUtil'

class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: props.comment.content != null
                ? EditorState.createWithContent(convertFromRaw(JSON.parse(props.comment.content)))
                : EditorState.createEmpty()
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
        if(!this.isReply) {
            return <CommentForm type="reply" parent_comment={this.props.comment.id }/>
        }
    }

    render() {
        if (this.props.comment) {
            return (
                <article className={`${styles.comment} ${this.isReply && styles.reply}`}>
                    <section className={styles.comment__body}>
                        {this.displayAvatar()}
                        <div className={styles.comment__main}>
                            <div className={styles.comment__header}>
                                <div className={styles.comment__headerAuthor}>
                                <Link to={`/profile/${this.props.comment.profile.display_name}`} className={styles.comment__headerAuthor}>
                                    {this.props.comment.profile.display_name}
                                </Link>
                                </div>
                                <div className={styles.comment__headerPublishedTime}>
                                    {TimeUtil.timeAgo(new Date(this.props.comment.created_at))}
                                </div>
                            </div>
                            <div className={styles.comment__content}>
                                <Editor editorState={this.state.editorState} readOnly={true}/>
                            </div>
                            {this.displayCommentForm()}
                        </div>
                    </section>
                        <CommentChildren commentChildren={this.props.comment.children} />
                </article>
            )
        }
    }
}

export default Comment
