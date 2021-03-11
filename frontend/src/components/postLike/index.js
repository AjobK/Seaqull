import React, { Component } from 'react'
import styles from './postLike.scss'
import { inject, observer } from 'mobx-react'

@inject('store') @observer
class PostLike extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { likesAmount } = this.props

        return (
            <div className={`${styles.postLike} ${this.props.liked ? styles.liked : ''}`}>
            <p>{likesAmount} feathers</p>
                <button onClick={this.props.toggleLike.bind(this)}>
                    &#10084;
                </button>
            </div>
        )
    }
}

export default PostLike
