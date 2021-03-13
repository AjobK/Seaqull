import React from 'react'
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard, Section } from '../../layouts'
import { PostBanner, PostContent, Button, Icon, PostLike } from '../../components'
import { withRouter } from 'react-router-dom'
import styles from './post.scss'
import Axios from 'axios'

@inject('store') @observer
class Post extends App {
    constructor(props) {
        super(props)

        this.post = {
            title: 'Loading..',
            description: 'Loading..',
            content: 'Loading..',
            path: 'Loading..',
            likes: {
                amount: 0,
                user_liked: false
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
            post: this.post
        }

        Axios.defaults.baseURL = this.props.store.defaultData.backendUrl

        // TODO: API Call for initial data
        this.loadArticle();
    }

    loadArticle = () => {
        const path = window.location.pathname.split('/').filter(i => i != '').pop()
        const url = `http://localhost:8000/api/post/${path}`

        Axios.get(`/post/${path}`, {withCredentials: true})
        .then(res => {
            // if (!this.totalPages) this.totalPages = json.data.last_page
            console.log('POST FOUND')
            this.post = {
                title: res.data.post.title,
                content: res.data.post.content,
                description: res.data.post.description,
                path: path,
                likes: {
                    amount: res.data.likes.amount,
                    user_liked: res.data.likes.user_liked
                }
            }

            this.setState({
                post: this.post
            })
        })
        .catch(err => {
            console.log('Error occurred while fetching post')
        })
    }

    toggleLike = () => {
        // Toggles liked state for all like components
        console.log('LIKE TOGGLED')
        let newState = this.state

        // Increment/decrement likes locally
        let newLikesAmount
        if (this.state.post.likes.user_liked && newState.post.likes.amount > 0) {
            newLikesAmount = this.state.post.likes.amount - 1
        } else {
            newLikesAmount = this.state.post.likes.amount + 1
        }
        newState.post.likes.amount = newLikesAmount
        this.state.post.likes.user_liked = !this.state.post.likes.user_liked

        this.setState(newState)
    }

    sendToDB() {
        console.log('Saving');
        console.log(this.state.post.title != null ? this.state.post.title.blocks[0].text : null)

        return;
    }

    render() {
        // Values change based on initial response from server
        const { isEditing, isOwner } = this.state

        console.log('RERENDERED')
        console.log(this.state.post)

        return (
            <Standard className={[styles.stdBgWhite]}>
                <PostBanner author={this.state.author} isOwner={isOwner} />
                <Section noTitle>
                <div className={styles.likePostWrapper}>
                    <PostLike
                        likesAmount={this.state.post.likes.amount || 0}
                        liked={this.state.post.likes.user_liked}
                        toggleLike={this.toggleLike}
                    />
                </div>
                <div className={styles.renderWrapper}>
                <PostContent
                    key={1}
                    type={'title'}
                    // Saves post title with draftJS content
                    callBackSaveData={(data) => {
                        this.post.title = data;

                        this.setState({ post: this.post })
                    }}
                    readOnly={!isOwner || !isEditing}
                    value={this.state.post.title} // Initial no content, should be prefilled by API
                />
                <PostContent
                    key={2}
                    type={'content'}
                    // Saves post content with draftJS content
                    callBackSaveData={(data) => {
                        this.post.content = data;

                        this.setState({ post: this.post })
                    }}
                    readOnly={!isOwner || !isEditing}
                    value={this.state.post.content} // Initial no content, should be prefilled by API
                />
                </div>
                {
                    isOwner && isEditing &&
                    <Button
                        className={[styles.publishButton, /* isPublished ? styles.published : */''].join(' ')}
                        value={'Create'}
                        onClick={() => this.sendToDB()}
                    />
                }
                </Section>
            </Standard>
        )
    }
}

export default withRouter(Post)
