import React, { Component } from 'react'
import styles from './postLikesList.scss'
import { inject, observer } from 'mobx-react'
import Axios from "axios"
import { withRouter } from "react-router"

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
                    console.log(like)
                    const userLike = {
                        display_name: like.profile.display_name,
                        avatarURL: '/src/static/dummy/user/profile.jpg',
                        level: null
                    }
                    likes.push(userLike)
                })

                this.setState({
                    likes
                })
            })
    }

    goToProfile = (displayName) => {
        this.props.history.push('/profile/' + displayName)
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
                            return <li key={index} className={`${styles.likesListItem}`} onClick={() => this.goToProfile(like.display_name)}>
                                <div className={`${styles.avatarWrapper}`}>
                                    <div className={`${styles.avatar}`} style={{ backgroundImage: `url(${like.avatarURL || ''})` }} />
                                    <div className={`${styles.level}`}>
                                        <div className={`${styles.levelNumber}`}>{like.level || Math.floor(Math.random() * 100)}</div>
                                    </div>
                                </div>
                                <p className={`${styles.displayName}`}>{like.display_name}</p>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(PostLikesList)
