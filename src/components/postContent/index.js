import React, { Component } from 'react'
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
    this.sanitizeFilter = {
      paragraph: {
        allowedTags: [ 'br', 'b', 'i', 'em', 'strong' ]
      }
    }
    this.state = {
      value: props.value || ''
    }
  }

  onClick = () => {
    this.callBackData()
  }

  setValue = (e) => {
    this.setState({
      // value: e.target.value
      value: sanitizeHtml(e.target.value, this.sanitizeFilter[this.type])
    }, () => {
      this.callBackData()
    })
  }

  callBackData = () => {
    if (this.props.theCB)
      this.props.theCB(this)
  }

  sanitize = () => {
    this.setState({ value: sanitizeHtml(this.state.value, this.sanitizeFilter[this.type]) });
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
          onBlur={this.sanitize}
          disabled={!store.user.loggedIn}
        />
      </PostContentBlock>
    )
  }
}

export default PostContent
