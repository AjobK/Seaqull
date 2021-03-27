import React, { Component } from 'react'
import styles from './comment.scss'
import { Link } from 'react-router-dom'
import {Editor, EditorState, convertFromRaw, ContentState} from 'draft-js';

import TimeUtil from '../../util/timeUtil'

class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: props.comment.content != null
                ? EditorState.createWithContent(convertFromRaw(JSON.parse(props.comment.content)))
                : EditorState.createEmpty()
        }
    }

    render() {
        if(this.props.comment) {
            return (
                <article className={styles.comment}>
                    <section className={styles.comment__body}>
                        <div className={styles.comment__avatar}>
                            {/* TODO: replace profile image */}
                            <img src={require('../../static/dummy/user/profile.jpg')} className={styles.comment__avatarPicture} />
                            <div className={styles.comment__avatarBadge}>
                                {this.props.comment.profile.experience > 0 ? this.props.comment.profile.experience/1000 : 0 }
                            </div>
                        </div>
                        <div className={styles.comment__main}>
                            <div className={styles.comment__header}>
                                <Link to={`/profile/${this.props.comment.profile.display_name}`} className={styles.comment__headerAuthor}>
                                    {this.props.comment.profile.display_name}
                                </Link>
                                <div className={styles.comment__headerPublishedTime}>
                                    {TimeUtil.timeAgo(new Date(this.props.comment.created_at))}
                                </div>
                            </div>
                            <div className={styles.comment__content}>
                                <Editor editorState={this.state.editorState} readOnly={true}/>
                            </div>
                        </div>
                    </section>
                </article>
            )
        }
    }
}

export default Comment
