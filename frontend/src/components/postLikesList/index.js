import React, { Component } from 'react'
import styles from './postLikesList.scss'
import { inject, observer } from 'mobx-react'
import Axios from "axios"
import { Link } from "react-router-dom";
import Like from '../../static/icons/heart-solid.svg'

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
                        level: 0,
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
                        <div className={`${styles.likesListTitle}`}>
                            <h2>Likes <img src={Like} alt={'Like'} className={`${styles.like}`}/></h2>
                        </div>
                        <span className={`${styles.closeLikes}`} onClick={this.props.closeLikesList}>x</span>
                    </header>
                    <ul className={`${styles.likesList}`}>
                        {this.state.likes.map((like, index) => {
                            return <li key={index} className={`${styles.likesListItem}`}>
                                <Link to={`/profile/${like.displayName}`} className={styles.profileLikeLink}>
                                    <div className={`${styles.profileAvatarWrapper}`}>
                                        <div className={`${styles.avatar}`} style={{ backgroundImage: `url(${like.avatarURL || ''})` }} />
                                        <div className={`${styles.level}`}>
                                            <div className={`${styles.levelNumber}`}>{like.level}</div>
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

export default PostLikesList
