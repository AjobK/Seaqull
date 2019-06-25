import React from 'react'
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard, Section } from '../../layouts'
import { PostBanner, PostContent, Button } from '../../components'
import { convertToRaw, convertFromRaw } from 'draft-js'
import styles from './post.scss'

@inject('store') @observer
class Post extends App {
  constructor(props) {
    super(props)

    let content = window.localStorage.getItem('content')

    if (!content) {
      window.localStorage.setItem('content', JSON.stringify([
        { type: 'title', value: null },
        { type: 'story', value: null }
      ]))
    }

    this.content = JSON.parse(content)
    this.cbKey = 0
    this.state = {
      isPublished: true,
      renderContent: []
    }
  }

  componentDidMount() {
    this.returnComponentsFromJson()
  }

  callBackSaveData = (item) => {
    const { editorState } = item.state

    this.content[item.cbKey-1] = {
      type: item.type,
      value: convertToRaw(editorState.getCurrentContent())
    }
    this.sendDataToDB()
  }

  callBackItemRemoval = (item) => {
    const { cbKey } = item.props

    this.content.splice(cbKey-1, 1)
    this.returnComponentsFromJson()
  }

  createContentBlock = (type) => {
    this.content.push({ type: type, value: null })
    this.returnComponentsFromJson()
  }

  returnComponentsFromJson = (noSetState = false) => {
    let contentArr = []

    this.content.forEach((item, counter) => {
      const { type, value } = item

      contentArr.push(
        <PostContent
          key={this.cbKey+counter+1}
          type={type}
          callBackSaveData={this.callBackSaveData}
          callBackItemRemoval={this.callBackItemRemoval}
          cbKey={counter+1}
          value={value ? convertFromRaw(value) : null}
        />)
    })
    
    this.cbKey += contentArr.length

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
    window.localStorage.setItem('content', JSON.stringify(this.content));
  }

  render() {
    const { isPublished } = this.state

    return (
      <Standard className={[styles.stdBgWhite]}>
        <PostBanner />
        <Section noTitle>
          <div className={styles.renderWrapper}>
            { this.state.renderContent }
          </div>
          <Button
            className={[styles.publishButton, isPublished ? styles.published : ''].join(' ')}
            value={isPublished ? 'UNPUBLISH STORY': 'PUBLISH STORY'}
          />
        </Section>
      </Standard>
    )
  }
}

export default Post
