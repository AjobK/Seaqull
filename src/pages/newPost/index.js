import React from 'react'
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard, Section } from '../../layouts'
import { PostBanner, PostContent, Button, Icon } from '../../components'
import { convertToRaw, convertFromRaw } from 'draft-js'
import { withRouter } from 'react-router-dom'
import styles from './newPost.scss'
import Axios from 'axios'

@inject('store') @observer
class NewPost extends App {
  constructor(props) {
    super(props)

    this.post = {
      title: null,
      description: null,
      content: null,
      path: null
    }

    this.state = {
      isOwner: false,
      isEditing: false
    }
  }

  sendToDB() {
    // console.log(process.env)
    console.log('Saving');
    console.log(this.post.title != null ? this.post.title.blocks[0].text : null)
    // Axios.defaults.baseURL = this.props.store.defaultData.backendUrl
    return;
    let token = localStorage.getItem('token')

    Axios.post(`/post`,
        {
          'title': this.content.title.blocks[0].text || 'No title',
          'content': JSON.stringify(this.content.story || 'Nothing to tell...'),
          'description': 'Temporary description'
        },
        { mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type':'application/json', 'Authorization': `Bearer ${token}` }}
    )
    .then(() => {
      this.props.history.push('/');
    })
    .catch(() => {
      alert('Error...');
    })
  }

  render() {
    const { store } = this.props

    // Values change based on initial response from server
    const { isEditing, isOwner } = this.state

    return (
      <Standard className={[styles.stdBgWhite]}>
        <PostBanner userData={store.user} isOwner={true} />
        <Section noTitle>
          <div className={styles.renderWrapper}>
          <PostContent
            key={Math.random()}
            type={'title'}
            // Saves post title with draftJS content
            callBackSaveData={(data) => {
              this.post.title = data;
            }}
            value={null} // Initial no content, should be prefilled by API
          />
          <PostContent
            key={Math.random()}
            type={'content'}
            // Saves post content with draftJS content
            callBackSaveData={(data) => {
              this.post.content = data;
            }}
            value={null} // Initial no content, should be prefilled by API
          />
          </div>
          <Button
            className={[styles.publishButton, /* isPublished ? styles.published : */''].join(' ')}
            value={
              // store.user.isEditing ? 'QUIT EDIT' : 'EDIT'
              'Create'
            }
            onClick={() => this.sendToDB()}
          />
        </Section>
      </Standard>
    )
  }
}

export default withRouter(NewPost)
