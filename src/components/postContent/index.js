import React, { Component, createRef } from 'react'
import styles from './postContent.scss'
import { inject, observer } from 'mobx-react'
import PostContentBlock from '../postContentBlock'
import ContentEditable from 'react-contenteditable'
import sanitizeHtml from 'sanitize-html'

@inject('store') @observer
class PostContent extends Component {
  constructor(props) {
    super(props)
    this.type = this.props.type || 'paragraph'
    this.elRef = createRef()
    this.sanitizeFilter = {
      paragraph: {
        allowedTags: ['img', 'br', 'div', 'b', 'i', 'em', 'strong'],
        allowedIframeHostnames: ['www.youtube.com']
      }
    }
    this.state = {
      value: props.value || ''
    }
  }

  setValue = () => {
    this.setState({
      value: this.elRef.current.innerText
      // value: e.target.value
    }, () => {
      this.callBackData()
    })
  }

  callBackData = () => {
    if (this.props.theCB)
      this.props.theCB(this)
  }

  keyDown = () => {
    let dirty = this.elRef.current.innerText

    if (!dirty)
      return false

    this.setState({
      value: sanitizeHtml(dirty, this.sanitizeFilter[this.type])
    })
  }

  render() {
    const { type, store } = this.props

    return (
      <PostContentBlock heading={type}>
        <ContentEditable
          className={`${styles.postContent} ${styles[type]}`}
          onClick={this.onClick}
          html={this.state.value || ''}
          onChange={this.setValue}
          onKeyDown={this.keyDown}
          disabled={!store.user.loggedIn}
          innerRef={this.elRef}
        />
      </PostContentBlock>
    )
  }
}

export default PostContent
