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
            isEditing: false,
            author: {
                name: 'Emily Washington',                                   // Display name
                bannerURL: '/src/static/dummy/user/banner.jpg',     // Banner URL from ID
                avatarURL: '/src/static/dummy/user/profile.jpg',    // Avatar URL from ID
                path: '/profile',                                   // Custom path
                level: 0,                                           // Level of user
                title: 'Software Engineer'                          // Currently selected title by ID
            }
        }
        
        // TODO: API Call for initial data
    }

    sendToDB() {
        console.log('Saving');
        console.log(this.post.title != null ? this.post.title.blocks[0].text : null)

        return;
    }

    render() {
        // Values change based on initial response from server
        const { isEditing, isOwner } = this.state

        return (
            <Standard className={[styles.stdBgWhite]}>
                <PostBanner author={this.state.author} isOwner={isOwner} />
                <Section noTitle>
                <div className={styles.renderWrapper}>
                <PostContent
                    key={1}
                    type={'title'}
                    // Saves post title with draftJS content
                    callBackSaveData={(data) => {
                    this.post.title = data;
                    }}
                    readOnly={!isOwner || !isEditing}
                    value={null} // Initial no content, should be prefilled by API
                />
                <PostContent
                    key={2}
                    type={'content'}
                    // Saves post content with draftJS content
                    callBackSaveData={(data) => {
                    this.post.content = data;
                    }}
                    readOnly={!isOwner || !isEditing}
                    value={null} // Initial no content, should be prefilled by API
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
