import React from 'react'
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard, Section } from '../../layouts'
import { PostBanner, PostContent, Button, Icon, PostLike } from '../../components'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import styles from './post.scss'
import { convertFromRaw } from 'draft-js'

@inject('store') @observer
class Post extends App {
    constructor(props) {
        super(props)

        this.post = {
            title: '',
            description: '',
            content: '',
            path: '',
            likes: {
                amount: 0,
                userLiked: false
            }
        }

        this.state = {
            isOwner: true,
            isEditing: true,
            author: {
                name: 'Emily Washington',                                   // Display name
                bannerURL: '/src/static/dummy/user/banner.jpg',     // Banner URL from ID
                avatarURL: '/src/static/dummy/user/profile.jpg',    // Avatar URL from ID
                path: '/profile',                                   // Custom path
                level: 0,                                           // Level of user
                title: 'Software Engineer'                          // Currently selected title by ID
            },
            loaded: false,
            post: this.post
        }
    }

    loadArticle = () => {
        let path = window.location.pathname.split('/').filter(i => i != '').pop()

        Axios.get(`${this.props.store.defaultData.backendUrl}/post/${path}`, {withCredentials: true})
        .then(res => {
            this.post = {
                title: res.data.post.title,
                content: res.data.post.content,
                description: res.data.post.description,
                path: path,
                likes: {
                    amount: res.data.likes.amount,
                    userLiked: res.data.likes.userLiked
                }
            }

            try {
                this.post = {
                    title: convertFromRaw(JSON.parse(res.data.post.title)),
                    content: convertFromRaw(JSON.parse(res.data.post.content)),
                    description: '',
                    path: path,
                    likes: {
                        amount: res.data.likes.amount,
                        userLiked: res.data.likes.userLiked
                    }
                }
            } catch (e) {
                this.post = {
                    title: res.data.post.title,
                    content: res.data.post.content,
                    description: res.data.post.description,
                    path: path,
                    likes: {
                        amount: res.data.likes.amount,
                        userLiked: res.data.likes.userLiked
                    }
                }
            }

            let author = {
                name: res.data.post.profile.display_name,               // Display name
                bannerURL: '/src/static/dummy/user/banner.jpg',         // Banner URL from ID
                avatarURL: '/src/static/dummy/user/profile.jpg',        // Avatar URL from ID
                path: `/profile/${res.data.post.profile.display_name}`, // Custom path
                level: 1,                                               // Level of user
                title: 'Default Title'                                  // Currently selected title by ID
            }

            this.setState({
                post: this.post,
                loaded: true,
                isOwner: res.data.isOwner,
                isEditing: true,
                author: author
            })
        })
    }

    toggleLike = () => {
        // Toggles liked state for all like components
        let newState = this.state

        // Increment/decrement likes locally
        let newLikesAmount
        if (this.state.post.likes.userLiked && newState.post.likes.amount > 0) {
            newLikesAmount = this.state.post.likes.amount - 1
        } else {
            newLikesAmount = this.state.post.likes.amount + 1
        }
        newState.post.likes.amount = newLikesAmount
        this.state.post.likes.userLiked = !this.state.post.likes.userLiked

        this.setState(newState)
    }

    componentDidMount() {
        if (!this.props.new) this.loadArticle()
    }

    sendToDB(path=null) {
        Axios.defaults.baseURL = this.props.store.defaultData.backendUrl

        const payload = {
            title: this.state.post.title,
            description: 'None',
            content: this.state.post.content
        }

        if (!path) {
            Axios.post('/post', payload, { withCredentials: true })
            .then(res => {
                this.props.history.push('/')
            })
        } else if (typeof path == 'string') {
            Axios.put(`/post/${path}`, payload, { withCredentials: true })
            .then(res => {
                this.props.history.push('/profile')
            })
        }
    }

    render() {
        // Values change based on initial response from server
        const { isEditing, isOwner, post, loaded, author } = this.state

        if (!loaded && !this.props.new) return (<h1>Not loaded</h1>)

        return (
            <Standard className={[styles.stdBgWhite]}>
                <PostBanner author={author} isOwner={isOwner} />
                <Section noTitle>
                { !this.props.new &&
                    <div className={styles.likePostWrapper}>
                        <PostLike
                            likesAmount={this.state.post.likes.amount || 0}
                            liked={this.state.post.likes.userLiked}
                            toggleLike={this.toggleLike}
                            isOwner={isOwner}
                        />
                    </div>
                }
                <div className={styles.renderWrapper}>
                <PostContent
                    type={'title'}
                    // Saves post title with draftJS content
                    callBackSaveData={(data) => {
                        this.post.title = data

                        this.setState({ post: this.post })
                    }}
                    readOnly={!isOwner || !isEditing}
                    value={post.title} // Initial no content, should be prefilled by API
                />
                <PostContent
                    type={'content'}
                    // Saves post content with draftJS content
                    callBackSaveData={(data) => {
                        this.post.content = data

                        this.setState({ post: this.post })
                    }}
                    readOnly={!isOwner || !isEditing}
                    value={post.content} // Initial no content, should be prefilled by API
                />
                </div>
                {
                    isOwner && this.props.new &&
                    <Button
                        className={[styles.publishButton, /* isPublished ? styles.published : */''].join(' ')}
                        value={'Create'}
                        onClick={() => this.sendToDB()}
                    />
                }
                {
                    isOwner && isEditing && !this.props.new &&
                    <Button
                        className={[styles.publishButton, /* isPublished ? styles.published : */''].join(' ')}
                        value={'Update'}
                        onClick={() => this.sendToDB(this.post.path)}
                    />
                }
                </Section>
            </Standard>
        )
    }
}

export default withRouter(Post)
