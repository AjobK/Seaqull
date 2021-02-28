import React, { Component } from 'react'
import Axios from 'axios'
import styles from './commentSection.scss'

import { Comment } from '../'

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
        return this.data.map((comment) => {
            return (
                <Comment key={comment.id} comment={comment} />
            )
        })
    }

    render() {
        if(this.data.length <= 0) {
            return <p>Loading...</p>
        } else {
            return (
                this.displayComments()
            )
        }
    }
}

export default CommentSection