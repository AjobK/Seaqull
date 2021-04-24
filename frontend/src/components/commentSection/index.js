import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import Axios from 'axios'

import styles from './commentSection.scss'

import { Section } from '../../layouts'
import { Comment } from '../'
import { CommentForm } from '../'
@inject('store') @observer
class CommentSection extends Component {
    constructor(props) {
        super(props)
        this.state = { comments: [], commentObjects: []}
    }

    loadComments() {
        let path = window.location.pathname.split('/').filter(i => i != '').pop()
        const url = `http://localhost:8000/api/comment/${path}`

        Axios.get(url)
        .then(response => {
            let comments = this.nestComments(response.data)
            this.setState({ comments: comments })
            this.displayComments()
        }).catch((err) => {
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
        const { user, profile } = this.props.store
        
        if(profile.loggedIn) {
            return (
                <CommentForm onCommentAdd={this.onCommentAdd} />
            )
        }

        return (
            <p>Please <Link to='/login' className={styles.commentSection__highlightedLink}>log in</Link> to comment to this post</p>
        )
    }

    displayComments = () => {
        console.log('displaying comments')
        if(!this.state.comments) {
            console.log('loading..')
            return <p>Loading...</p>
        } 
        
        if (this.state.comments.length <= 0) {
            console.log('empty')
            return <p>No comments have been added yet.</p>
        }

        this.setState({ commentObjects: this.state.comments.map((comment) => {         
            console.log(comment)   
            return (
                <Comment key={comment.id} comment={comment} onReplyAdd={this.onCommentAdd} />
            )
        })})
    }

    nestComments = (commentList) => {
        const commentMap = {}

        if(commentList.length > 0) {
            commentList.forEach(comment => commentMap[comment.id] = comment)

            commentList.forEach(comment => {
                if (comment.parent_comment_id !== null) {
                    const parent = commentMap[comment.parent_comment_id]
                    parent.children ? parent.children.push(comment) : parent.children = [comment]
                }
            })
    
            return commentList.filter(comment => {
                return comment.parent_comment_id === null
            })

        }
    }

    render() {
        console.log('rendering')
        console.log(this.state.commentObjects)
        return (
            <div className={styles.commentSection}>
                <Section noTitle>
                    { this.displayCommentForm() }
                    { this.state.commentObjects }
                </Section>
            </div>
        )
    }
}

export default CommentSection
