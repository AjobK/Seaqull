import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Editor, EditorState, convertFromRaw, ContentState} from 'draft-js'

import styles from './commentChildren.scss'

import { Comment } from '../'

class CommentChildren extends Component {
    constructor(props) {
        super(props)
        this.state = { data: props.commentChildren }
    }

    displayChildren = () => {
        if (this.state.data) {
            return this.state.data.map((comment) => {
                return (
                    <Comment key={comment.id} comment={comment} type="reply" />
                )
            })
        }
    }

    render() {
        return (
            <div className={styles.childrenWrapper}>
                { this.displayChildren() }
            </div>
        )
    }
}

export default CommentChildren