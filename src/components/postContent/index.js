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
        // allowedTags: [ 'img' ],
        selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' ],
        allowProtocolRelative: true,
        allowedAttributes: {
          'a': [ 'href' ]
        },
        allowedIframeHostnames: ['www.youtube.com']
      }
    }
    this.state = {
      value: props.value || '',
      valueTwo: props.value || ''
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

  onChange = (e) => {
    console.log('*******************')
    console.log(e.target.value)
    console.log(sanitizeHtml(e.target.value, this.sanitizeFilter[this.type]))
    console.log('*******************')

    this.setState({
      value: e.target.value,
      valueTwo: e.target.value
    }, () => {
      // this.callBackData()
    })
  }

  render() {
    const { type, store } = this.props

    return (
      <PostContentBlock heading={type}>
        <ContentEditable
          className={`${styles.postContent} ${styles[type]}`}
          // onClick={this.onClick}
          html={sanitizeHtml(this.state.value, this.sanitizeFilter[this.type]) || ''}
          onChange={this.onChange}
          // onKeyDown={this.keyDown}
          disabled={!store.user.loggedIn}
          // innerRef={this.elRef}
        />
        <ContentEditable
          className={`${styles.postContent} ${styles[type]}`}
          // onClick={this.onClick}
          html={this.state.valueTwo || ''}
          onChange={this.onChange}
          // onKeyDown={this.keyDown}
          disabled={!store.user.loggedIn}
          // innerRef={this.elRef}
        />
      </PostContentBlock>
    )
  }
}

export default PostContent
