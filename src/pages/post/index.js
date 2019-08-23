import React from 'react'
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard, Section } from '../../layouts'
import { PostBanner, PostContent, Button, Icon } from '../../components'
import { convertToRaw, convertFromRaw } from 'draft-js'
import styles from './post.scss'

@inject('store') @observer
class Post extends App {
  constructor(props) {
    super(props)

    let content = window.localStorage.getItem('content')

    if (!content || !JSON.parse(content)) {
      content = JSON.stringify({
        title: null,
        story: null
      })
      window.localStorage.setItem('content', content)
    }

    this.content = JSON.parse(content)

    this.cbKey = 0
    this.state = {
      isPublished: true,
      renderContent: [],
      currentEditorState: null,
      saving: false,
      date: '12 mar 2019'
    }
  }

  componentDidMount() {
    this.returnComponentsFromJson()
  }

  callBackSaveData = (item) => {
    const { editorState } = item.state
    const { type } = item.props

    this.content[type] = convertToRaw(editorState.getCurrentContent())
    this.sendDataToDB()
  }

  returnComponentsFromJson = (noSetState = false) => {
    let typeArr = ['title', 'story']
    let contentArr = []

    typeArr.forEach((type, i) => {
      contentArr.push(
        <PostContent
          key={i}
          type={type}
          callBackSaveData={this.callBackSaveData}
          value={this.content[type] ? convertFromRaw(this.content[type]) : null}
        />
      )
    })
    
    if (!noSetState) {
      this.setState({
        renderContent: contentArr
      }, () => {
        this.sendDataToDB()
      })
    } else {
      this.sendDataToDB()
    }
  }

  sendDataToDB() {
    // Send this data
    // Replace this with API call
    window.localStorage.setItem('content', JSON.stringify(this.content));
  }

  render() {
    const { isPublished, saving } = this.state
    const { store } = this.props

    return (
      <Standard className={[styles.stdBgWhite]}>
        <PostBanner />
        <Section noTitle>
          { (!store.user.isEditing || !store.post.isOwner) &&
            <div className={styles.date}>
              <Icon iconName={'Clock'} className={styles.dateIcon} /> 12 mar 2019
            </div>
          }
          <div className={styles.renderWrapper}>
            { this.state.renderContent }
          </div>
          { store.post.isOwner &&
          <div className={styles.info}>
            <Button
              className={[styles.publishButton, isPublished ? styles.published : styles.unpublishable].join(' ')}
              value={isPublished ? 'UNPUBLISH': 'PUBLISH'}
            />
            <Button
              className={[styles.publishButton, isPublished ? styles.published : ''].join(' ')}
              value={
                store.user.isEditing ? 'QUIT EDIT' : 'EDIT'
              }
            />
            { (saving && store.user.isEditing) && <p className={styles.infoSaving}> Saving... </p> }
          </div>
          }
        </Section>
      </Standard>
    )
  }
}

export default Post
