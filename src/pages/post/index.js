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

    if (!content || !JSON.parse(content)) {
      console.log('I am actually here')
      content = JSON.stringify({
        title: null,
        story: null
      })
      window.localStorage.setItem('content', content)
      console.log(window.localStorage.getItem('content'))
    }
    console.log(window.localStorage.getItem('content'))
    console.log('The content:')
    this.content = JSON.parse(content)

    console.log(this.content)
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
    const { type } = item.props

    console.log(editorState)

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
    
    console.log(contentArr)

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
