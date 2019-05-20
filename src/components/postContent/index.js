import React, { Component, createRef } from 'react'
import styles from './postContent.scss'
import { inject, observer } from 'mobx-react'
import PostContentBlock from '../postContentBlock'
import ContentEditable from 'react-contenteditable'
import sanitizeHtml from 'sanitize-html'
import { EditorState, Editor, RichUtils } from 'draft-js'

@inject('store') @observer
class PostContent extends Component {
  constructor(props) {
    super(props)
    this.type = this.props.type || 'paragraph'
    this.maxLength = this.type == 'heading' ? 128 : null 
    this.elRef = createRef()
    this.state = {
      value: props.value || '',
      valueTwo: props.value || '',
      editorState: EditorState.createEmpty(),
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

  onChange = (editorState) => {
    console.log(editorState)
    const contentState = editorState.getCurrentContent()
    const oldContent = this.state.editorState.getCurrentContent()

    if (contentState === oldContent || !this.maxLength || contentState.getPlainText().length <= this.maxLength) {
      console.log('Allowed')
      console.log((Math.random() * 100).toFixed(0))
      this.setState({ editorState })
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
      <PostContentBlock heading={type}>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          handleBeforeInput={this.handleBeforeInput}
          handlePastedText={this.handlePastedText}
          onKeydown={this.handleBeforeInput}
          blockStyleFn={() => (`${styles.postContent} ${styles[type]}`)}
        />
      </PostContentBlock>
    )
  }
}

export default PostContent
