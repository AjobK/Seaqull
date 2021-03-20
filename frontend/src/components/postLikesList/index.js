import React, { Component } from 'react'
import styles from './postLikesList.scss'
import { inject, observer } from 'mobx-react'
import Axios from "axios";

@inject('store') @observer
class PostLikesList extends Component {
    constructor(props) {
        super(props)
        this.toggleLike = this.props.toggleLike.bind(this)
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
