import React, { Component } from 'react'
import Axios from 'axios'
import styles from './commentForm.scss'

import { CommentEditor } from '../'

class CommentForm extends Component {

    constructor(props) {
        super(props)

        this.comment = {
            path: window.location.pathname.split('/').filter(i => i != '').pop(),
            content: null,
            parent_comment_id: this.props.parent_comment
        }

        this.state = {
            comment: this.comment
        }
    }

    onCommentSubmit = () => {
        const url = `http://localhost:8000/api/comment/`

        Axios.post(url, this.state.comment, { withCredentials: true }).then(response => {
            this.resetComment()
            this.props.onCommentAdd()
        }).catch(err => {
            //TODO: handle error
        })
    }

    resetComment = () => {
        this.comment.content = null
        this.setState({ comment: this.comment })
    }

    render() {
        const { className } = this.props

        return (
            <div className={ className ? className : '' }>
                <CommentEditor
                    type={ this.props.type } 
                    onCommentChangeCallback={ (data) => {
                        this.comment.content = data

                        this.setState({ comment: this.comment })
                    } }
                    value={ this.state.comment.content }
                    onSubmitCallback={ this.onCommentSubmit }
                />
            </div>
        )
    }
}

export default CommentForm;
