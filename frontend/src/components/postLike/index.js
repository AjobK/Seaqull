import React, { Component } from 'react'
import styles from './postLike.scss'
import { inject, observer } from 'mobx-react'

@inject('store') @observer
class PostLike extends Component {
    constructor(props) {
        super(props)
    }

    likePost() {

    }

    render() {
        const { likesAmount } = this.props

        return (
            <div className={styles.postLike}>
                <p>{likesAmount} feathers</p>
                <button onClick={this.likePost}>&#10084;</button>
            </div>
        )
    }
}

export default PostLike
