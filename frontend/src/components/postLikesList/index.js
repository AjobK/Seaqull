import React, { Component } from 'react'
import styles from './postLikesList.scss'
import { inject, observer } from 'mobx-react'
import Axios from "axios";

@inject('store') @observer
class PostLikesList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={`${styles.postLikesListWrapper}`}>
                <div className={`${styles.likesBackground}`} onClick={this.props.closeLikesList}/>
                <div className={`${styles.likesList}`}>
                    <h1>Likes</h1>
                    
                </div>
            </div>
        )
    }
}

export default PostLikesList
