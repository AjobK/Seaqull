import React, { Component } from 'react'
import Axios from 'axios'
import styles from './commentSection.scss'

import { Comment } from '../'
import { CommentForm } from '../'
import { Section } from '../../layouts'

class CommentSection extends Component {
    constructor(props) {
        super(props)
        this.data = []
    }

    loadComments = () => {
        let path = window.location.pathname.split('/').filter(i => i != '').pop();
        const url = `http://localhost:8000/api/comment/${path}`

        Axios.get(url)
        .then(response => {
            console.log(response.data)
            this.data = response.data
        })
    }

    componentDidMount() {
        this.loadComments()
    }

    displayComments() {
        if(!this.data) {
            return <p>Loading...</p>
        } 
        
        if (this.data.length <= 0) {
            return <p>No comments have been added yet.</p>
        }

        return this.data.map((comment) => {
            return (
                <Comment key={comment.id} comment={comment} />
            )
        })
    }

    render() {
        return (
            <div className={styles.commentSection}>
                <Section noTitle>
                    <CommentForm />
                    { this.displayComments() }
                </Section>
            </div>
        )
    }
}

export default CommentSection