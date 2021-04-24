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
        this.state = { comments: []}
    }

    loadComments() {
        let path = window.location.pathname.split('/').filter(i => i != '').pop()
        const url = `http://localhost:8000/api/comment/${path}`

        fetch(url)
        .then((i) => i.json())
        .then((res) => {
            console.log('Response data (FETCH)')
            console.log(res)
        })

        Axios.get(url)
        .then(response => {
            console.log('Response data (AXIOS)')
            console.log(response.data)
            let comments = this.nestComments(response.data)
            this.setState({ comments: comments },
                this.displayComments
            )
        }).catch((err) => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.loadComments()
    }

    onCommentAdd = () => {
        console.log('Reloading comments with onadd!')
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

    nestComments = (commentList) => {
        console.log('Commentlist')
        console.log(commentList)
        const commentMap = {}

        if(commentList.length > 0) {
            // Add comment to comment map based on id
            commentList.forEach(comment => commentMap[comment.id] = comment)
            console.log('first commentMap')
            console.log(commentMap)


            commentList.forEach(comment => {
                if (comment.parent_comment_id !== null) {
                    const parent = commentMap[comment.parent_comment_id]

                    console.log(parent)
                    parent.children ? parent.children.push(comment) : parent.children = [comment]
                }
            })
            console.log('second commentMap')
            console.log(commentMap)
    
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
                    { this.state.comments && this.state.comments.length > 0
                        ? this.state.comments.map((comment) => (
                            <Comment key={comment.id} comment={comment} onReplyAdd={this.onCommentAdd} />
                        ))
                        : <p>No comments</p>
                    }
                </Section>
            </div>
        )
    }
}

export default CommentSection
