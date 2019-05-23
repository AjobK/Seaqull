import React, { Component, createRef } from 'react'
import styles from './postContent.scss'
import { inject, observer } from 'mobx-react'
import PostContentBlock from '../postContentBlock'
import { EditorState, Editor } from 'draft-js'

@inject('store') @observer
class PostContent extends Component {
  constructor(props) {
    super(props)
    this.type = this.props.type || 'paragraph'
    this.maxLength = this.type == 'heading' ? 128 : null
    this.elRef = createRef()
    this.nextCallBackTime = ~~(Date.now() / 1000)

    this.state = {
      editorState: this.props.value ? EditorState.createWithContent(this.props.value) : EditorState.createEmpty()
    }
  }

  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent()
    const oldContent = this.state.editorState.getCurrentContent()

    if (contentState === oldContent || !this.maxLength || contentState.getPlainText().length <= this.maxLength) {
      this.setState({ editorState }, () => {
        const currentUnix = ~~(Date.now() / 1000)

        if (currentUnix >= this.nextCallBackTime) {
          this.props.callBackFunc(this)
          this.nextCallBackTime = currentUnix + 0 // Adding delay for next callback
        }
      })
    }
  }

  handleBeforeInput = (chars) => {
    if (!this.maxLength) return false

    const totalLength = this.state.editorState.getCurrentContent().getPlainText().length + chars.length

    return totalLength > this.maxLength;
  }

  handlePastedText = (text) => {
    if (!this.maxLength) return false

    const totalLength = this.state.editorState.getCurrentContent().getPlainText().length + text.length

    return totalLength > this.maxLength;
  }

  render() {
    const { type, store } = this.props
    const editorState = this.state.editorState;

    return (
      <PostContentBlock heading={type} className={[styles[`postContent${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`]]}>
        <div onClick={() => {
          this.props.callBackItemRemoval(this)
        }}>Remove</div>
        <Editor
          readOnly={!store.user.loggedIn}
          editorState={editorState}
          onChange={this.onChange}
          handleBeforeInput={this.handleBeforeInput}
          handlePastedText={this.handlePastedText}
          blockStyleFn={() => (`${styles.postContent} ${styles[type]}`)}
        />
      </PostContentBlock>
    )
  }
}

export default PostContent
