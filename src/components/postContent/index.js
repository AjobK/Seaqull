import React, { Component, createRef } from 'react'
import styles from './postContent.scss'
import { inject, observer } from 'mobx-react'
import PostContentBlock from '../postContentBlock'
import { EditorState, Editor } from 'draft-js'

@inject('store') @observer
class PostContent extends Component {
  constructor(props) {
    super(props)
    const { type, cbKey, value } = this.props

    this.type = type || 'paragraph'
    this.cbKey = cbKey || null
    this.maxLength = this.type == 'heading' ? 128 : null
    this.elRef = createRef()
    this.nextCallBackTime = ~~(Date.now() / 1000) + 10

    this.state = {
      editorState: value != null
        ? EditorState.createWithContent(value) 
        : EditorState.createEmpty()
    }
  }

  componentDidMount() {
    console.log(`${this.cbKey} mounted...`)
  }

  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent()
    const oldContent = this.state.editorState.getCurrentContent()

    if (contentState === oldContent || !this.maxLength || contentState.getPlainText().length <= this.maxLength) {
      this.setState({ editorState }, () => {
        const currentUnix = ~~(Date.now() / 1000)

        if (currentUnix >= this.nextCallBackTime) {
          this.props.callBackSaveData(this)
          this.nextCallBackTime = currentUnix + 10 // Adding delay for next callback
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
    const { type, store, callBackItemRemoval, callBackSaveData } = this.props
    const editorState = this.state.editorState;
    const style = styles[`postContent${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`]

    return (
      <PostContentBlock
        heading={type}
        removeItem={() => callBackItemRemoval(this)}
        className={[style]}>
        <span>{ this.props.cbKey }</span>
        <Editor
          readOnly={!store.user.loggedIn}
          editorState={editorState}
          onChange={this.onChange}
          onBlur={() => {  callBackSaveData(this)}}
          handleBeforeInput={this.handleBeforeInput}
          handlePastedText={this.handlePastedText}
          blockStyleFn={() => (`${styles.postContent} ${styles[type]}`)}
        />
      </PostContentBlock>
    )
  }
}

export default PostContent
