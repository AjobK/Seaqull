import React, { Component } from 'react'
import styles from './postLike.scss'
import { inject, observer } from 'mobx-react'
import Axios from 'axios'
import { withRouter } from 'react-router'
import { PostLikesList } from '../../components'
import { Icon } from '../../components'
import unitFormatterUtil from '../../util/unitFormatterUtil'
import URLUtil from '../../util/urlUtil'

@inject('store') @observer
class PostLike extends Component {
    constructor(props) {
        super(props)

        if (this.props.toggleLike) {
            this.toggleLike = this.props.toggleLike.bind(this)
        }

        this.state = {
            showLikes: false
        }
    }

    postLike = () => {
        const path = URLUtil.getLastPathArgument()

        Axios.post(`${this.props.store.defaultData.backendUrl}/post/like/${path}`, {}, {withCredentials: true})
            .then(() => {
                this.toggleLike()
            })
            .catch(err => {
                if (err.response.status === 401) {
                    this.props.history.push('/login/')
                }
            })

    }

    postUnlike = () => {
        const path = URLUtil.getLastPathArgument()

        Axios.delete(`${this.props.store.defaultData.backendUrl}/post/like/${path}`, {withCredentials: true})
            .then(() => {
                this.toggleLike()
            })
            .catch(err => {
            })
    }

    likeClicked = () => {
        if (!this.toggleLike) return

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
        const { likesAmount, isOwner } = this.props

        return (
            <div className={`${styles.postLike} ${this.props.liked ? styles.liked : ''}`}>
                { likesAmount <= 0 && (
                    <p className={`${styles.postLikesAmount}`}>0 likes</p>
                )}
                { likesAmount > 0 && (
                    <p className={`${styles.postLikesAmount} ${styles.clickableLikes}`} onClick={ this.openLikesList }>{ unitFormatterUtil.getNumberSuffix(likesAmount) } {likesAmount === 1 ? 'like' : 'likes'}</p>
                )}
                { !isOwner && (
                    <button onClick={ this.likeClicked }>
                        <Icon iconName={'Heart'} className={styles.likeIcon} />
                    </button>
                )}
                { this.state.showLikes && (
                    <PostLikesList closeLikesList={ this.closeLikesList }/>
                )}
            </div>
        )
    }
}

export default withRouter(PostLike)
