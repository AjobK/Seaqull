import React, { Component } from 'react'
import styles from './postLike.scss'
import { inject, observer } from 'mobx-react'
import Axios from 'axios'
import { withRouter } from 'react-router'

@inject('store') @observer
class PostLike extends Component {
    constructor(props) {
        super(props)
        this.toggleLike = this.props.toggleLike.bind(this)
    }

    postLike = () => {
        const path = window.location.pathname.split('/').filter(i => i != '').pop()

        Axios.post(`/post/like/${path}`, {}, {withCredentials: true})
            .then(res => {
                this.toggleLike()
            })
            .catch(err => {
                if (err.response.status === 401) {
                    this.props.history.push('/login/')
                }
            })

    }

    postUnlike = () => {
        const path = window.location.pathname.split('/').filter(i => i != '').pop()

        Axios.delete(`/post/like/${path}`, {withCredentials: true})
            .then(res => {
                this.toggleLike()
            })
            .catch(err => {
            })
    }

    likeClicked = () => {
        // Like or unlike based on old liked state value
        if (this.props.liked) {
            this.postUnlike()
        } else {
            this.postLike()
        }
    }

    render() {
        const { likesAmount } = this.props

        return (
            <div className={`${styles.postLike} ${this.props.liked ? styles.liked : ''}`}>
            <p>{likesAmount} feathers</p>
                <button onClick={ this.likeClicked }>
                    &#10084;
                </button>
            </div>
        )
    }
}

export default withRouter(PostLike)
