import React, { Component } from 'react'
import styles from './postLike.scss'
import { inject, observer } from 'mobx-react'
import Axios from "axios";

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
                console.log(res.data.message)
            })
            .catch(err => {
                console.log(err)
            })

    }

    postUnlike = () => {
        const path = window.location.pathname.split('/').filter(i => i != '').pop()

        Axios.delete(`/post/like/${path}`, {withCredentials: true})
            .then(res => {
                console.log(res.data.message)
            })
            .catch(err => {
                console.log(err)
            })
    }

    likeClicked = () => {
        // Like or unlike based on old liked state value
        if (this.props.liked) {
            this.postUnlike()
        } else {
            this.postLike()
        }

        this.toggleLike()
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

export default PostLike
