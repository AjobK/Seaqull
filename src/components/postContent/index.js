import React, { Component, createRef } from 'react'
import styles from './postContent.scss'
import { inject, observer } from 'mobx-react'
import PostContentBlock from '../postContentBlock'
import { convertToRaw, EditorState, Editor } from 'draft-js'

@inject('store') @observer
class PostContent extends Component {
  constructor(props) {
    super(props)
    this.type = this.props.type || 'paragraph'
    this.maxLength = this.type == 'heading' ? 128 : null 
    this.elRef = createRef()
    this.nextCallBackTime = ~~(Date.now() / 1000)

    this.state = {
      editorState: this.props.value ? EditorState.createWithContent(this.props.value) : EditorState.createEmpty(),
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

  onChange = (editorState) => {
    // console.log('Is called OnChange')
    const contentState = editorState.getCurrentContent()
    const oldContent = this.state.editorState.getCurrentContent()
    const currentUnix = ~~(Date.now() / 1000)

    if (currentUnix > this.nextCallBackTime) {
      this.props.callBackFunc(this)
      this.nextCallBackTime = currentUnix + 10 // Adding 10 seconds till next possible callBack
    }

    if (contentState === oldContent || !this.maxLength || contentState.getPlainText().length <= this.maxLength) {
      this.setState({ editorState })
    }
  }

  handleBeforeInput = (chars) => {
    // console.log('Is called HandleBeforeInput')
    if (!this.maxLength) return false

    const totalLength = this.state.editorState.getCurrentContent().getPlainText().length + chars.length
    return totalLength > this.maxLength;
  }

  handlePastedText = (text) => {
    // console.log('Is called HandlePastedText')
    if (!this.maxLength) return false

    const totalLength = this.state.editorState.getCurrentContent().getPlainText().length + text.length
    return totalLength > this.maxLength;
  }

  render() {
    // console.log('Is called Render')
    const { type, store } = this.props
    const editorState = this.state.editorState;

    return (
      <PostContentBlock heading={type} className={[styles[`postContent${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`]]}>
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
