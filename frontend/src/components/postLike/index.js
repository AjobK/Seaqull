import React, { Component } from 'react'
import styles from './postLike.scss'
import { inject, observer } from 'mobx-react'
import Axios from 'axios'
import { withRouter } from 'react-router'
import { PostLikesList } from '../../components'

@inject('store') @observer
class PostLike extends Component {
    constructor(props) {
        super(props)
        this.toggleLike = this.props.toggleLike.bind(this)

        this.state = {
            showLikes: false
        }
    }

    componentDidMount() {
        this.setState({
            showLikes: false
        })
    }

    postLike = () => {
        const path = window.location.pathname.split('/').filter(i => i != '').pop()

        Axios.post(`${this.props.store.defaultData.backendUrl}/post/like/${path}`, {}, {withCredentials: true})
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

        Axios.delete(`${this.props.store.defaultData.backendUrl}/post/like/${path}`, {withCredentials: true})
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

    openLikesList = () => {
        this.setState({
            showLikes: true
        })
    }

    closeLikesList = () => {
        this.setState({
            showLikes: false
        })
    }

    render() {
        const { likesAmount } = this.props

        return (
            <div className={`${styles.postLike} ${this.props.liked ? styles.liked : ''}`}>
                <p onClick={ this.openLikesList }>{likesAmount} feathers</p>
                <button onClick={ this.likeClicked }>
                    &#10084;
                </button>
                {this.state.showLikes && (
                    <PostLikesList closeLikesList={ this.closeLikesList }/>
                )}
            </div>
        )
    }
}

export default withRouter(PostLike)
