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
      paragraph: '',
      heading: ''
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
      value: e.target.value
    }, () => {
      this.callBackData()
    })
  }

  callBackData = () => {
    if (this.props.theCB)
      this.props.theCB(this)
  }

  render() {
    const { type, store } = this.props

    return (
      <PostContentBlock heading={type}>
        <ContentEditable
          className={`${styles.postContent} ${styles[type]}`}
          onClick={this.onClick}
          html={sanitizeHtml(this.state.value, this.sanitizeFilter[type]) || ''}
          onChange={this.setValue}
          disabled={!store.user.loggedIn}
        />
      </PostContentBlock>
    )
  }
}

export default PostContent
