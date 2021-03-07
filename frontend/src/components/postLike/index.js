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
        // const { amount } = this.props.post.likes

        return (
            <div className={styles.postLike}>
                <p>{2} feathers</p>
                <button onClick={this.likePost}>&#10084;</button>
            </div>
        )
    }
}

export default PostLike
