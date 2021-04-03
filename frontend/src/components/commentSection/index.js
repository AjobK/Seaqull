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
        this.state = {data: []}
    }

    loadComments() {
        let path = window.location.pathname.split('/').filter(i => i != '').pop()
        const url = `http://localhost:8000/api/comment/${path}`

        Axios.get(url)
        .then(response => {
            this.setState({data: response.data})
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
        if(!this.state.data) {
            return <p>Loading...</p>
        } 
        
        if (this.state.data.length <= 0) {
            return <p>No comments have been added yet.</p>
        }

        // return this.state.data.map((comment) => {
        //     if(!comment.parent_comment_id) {
        //         return (
        //             <Comment key={comment.id} comment={comment} />
        //         )
        //     }
        // })

        return this.nestComments(this.state.data).map((comment) => {
            console.log(comment)
            return (
                <Comment key={comment.id} comment={comment} />
            )
        })
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
        return (
            <div className={styles.commentSection}>
                <Section noTitle>
                    { this.displayCommentForm() }
                    { this.displayComments() }
                </Section>
            </div>
        )
    }
}

export default CommentSection
