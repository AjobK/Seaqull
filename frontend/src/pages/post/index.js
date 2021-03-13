import React from 'react'
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard, Section } from '../../layouts'
import { PostBanner, PostContent, Button, Icon } from '../../components'
import { withRouter } from 'react-router-dom'
import styles from './post.scss'

@inject('store') @observer
class Post extends App {
    constructor(props) {
        super(props)

        this.post = {
            title: null,
            description: null,
            content: null,
            path: null
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
        let path = window.location.pathname.split('/').filter(i => i != '').pop();
        const url = `http://localhost:8000/api/post/${path}`

        fetch(url)
        .then(response => response.json())
        .then(json => {
            // if (!this.totalPages) this.totalPages = json.data.last_page
            this.post = {
                title: json.title,
                content: json.content,
                description: json.description,
                path: path
            }

            this.setState({
                post: this.post,
                loaded: true,
                isOwner: json.isOwner
            })

        })
    }

    componentDidMount() {
        // TODO: API Call for initial data
        this.loadArticle();
    }

    sendToDB() {
        console.log('Saving');
        console.log(this.state.post.title != null ? this.state.post.title.blocks[0].text : null)

        return;
    }

    render() {
        // Values change based on initial response from server
        const { isEditing, isOwner } = this.state

        if (!this.state.loaded) return (<h1>Not loaded</h1>) 

        return (
            <Standard className={[styles.stdBgWhite]}>
                <PostBanner author={this.state.author} isOwner={isOwner} />
                <Section noTitle>
                <div className={styles.renderWrapper}>
                <PostContent
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
