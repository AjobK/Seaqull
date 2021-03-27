import React, { Component } from 'react'
import styles from './postLikesList.scss'
import { inject, observer } from 'mobx-react'
import Axios from "axios"
import { withRouter } from "react-router"
import {Link} from "react-router-dom";

@inject('store') @observer
class PostLikesList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            likes: []
        }
    }

    componentDidMount() {
        this.loadLikes()
    }

    loadLikes = () => {
        const path = window.location.pathname.split('/').filter(i => i != '').pop()
        Axios.get(`${this.props.store.defaultData.backendUrl}/post/like/${path}`)
            .then(res => {
                const likes = []
                res.data.forEach(like => {
                    const userLike = {
                        displayName: like.profile.display_name,
                        avatarURL: '/src/static/dummy/user/profile.jpg',
                        level: null,
                        title: 'Software Engineer'
                    }
                    likes.push(userLike)
                })

                this.setState({
                    likes
                })
            })
    }

    render() {
        return (
            <div className={`${styles.postLikesListWrapper}`}>
                <div className={`${styles.likesBackground}`} onClick={this.props.closeLikesList}/>
                <div className={`${styles.likesListWrapper}`}>
                    <header>
                        <h2>Feathers <span className={`${styles.feather}`}>&#10084;</span></h2>
                        <span className={`${styles.closeLikes}`} onClick={this.props.closeLikesList}>x</span>
                    </header>
                    <ul className={`${styles.likesList}`}>
                        {this.state.likes.map((like, index) => {
                            return <li key={index} className={`${styles.likesListItem}`}>
                                <Link to={`/profile/${like.displayName}`} className={styles.profileLikeLink}>
                                    <div className={`${styles.profileAvatarWrapper}`}>
                                        <div className={`${styles.avatar}`} style={{ backgroundImage: `url(${like.avatarURL || ''})` }} />
                                        <div className={`${styles.level}`}>
                                            <div className={`${styles.levelNumber}`}>{like.level || Math.floor(Math.random() * 100)}</div>
                                        </div>
                                    </div>
                                    <div className={`${styles.profileTextWrapper}`}>
                                        <p className={`${styles.profileDisplayName}`}>{like.displayName}</p>
                                        <p className={`${styles.profileTitle}`}>{like.title}</p>
                                    </div>
                                </Link>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(PostLikesList)
