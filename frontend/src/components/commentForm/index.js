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
        console.log('saving')
        const url = `http://localhost:8000/api/comment/`

        Axios.post(url, this.state.comment, {withCredentials: true}).then(response => {
            console.log(response.data)
            this.resetComment()
        }).catch(err => {
            console.log(err)
        })
    }

    resetComment = () => {
        this.comment.content = null
        this.setState({ comment: this.comment })
    }

    render() {
        return (
            <div className="commentForm">
                <CommentEditor 
                    onCommentChangeCallback={(data) => {
                        this.comment.content = data.blocks[0].text

                        this.setState({ comment: this.comment })
                    }}
                    value={this.state.comment.content} 
                />
                <button type="button" onClick={this.onCommentSubmit}>Save</button>
            </div>
        )
    }
}

export default CommentForm;