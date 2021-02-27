import React, { Component, createRef } from 'react'
import styles from './postContent.scss'
import { inject, observer } from 'mobx-react'
import PostContentBlock from '../postContentBlock'
import { EditorState, Editor, RichUtils, convertFromRaw, convertToRaw, ContentState } from 'draft-js'
import '../../DraftFallback.css'
import { StyleButton } from '../../components'

@inject('store') @observer
class PostContent extends Component {
  constructor(props) {
    super(props)
    const { type, value } = this.props

    this.type = type || 'content'
    this.selected = false
    this.maxLength = this.type == 'title' ? 128 : null
    this.elRef = createRef()
    this.nextCallBackTime = ~~(Date.now() / 1000) + 10

    this.editorInput = React.createRef()

    this.state = {
      // editorState: value != null
      //   ? EditorState.createWithContent(convertFromRaw(value))
      //   : EditorState.createEmpty(),
      editorState: value != null
        ? EditorState.createWithContent(ContentState.createFromText(value))
        : EditorState.createEmpty(),
      focused: false,
      toolTipPosition: {
        top: -9999,
        bottom: -9999,
        left: -9999,
        right: -9999,
        display: 'none'
      }
    }
  }

  onChange = (editorState) => {
    // if (this.focused) {
    //   let selectedText = window.getSelection().toString()

    //   if (selectedText.trim().length) {
    //     this.selected = true
    //     // this.showSelectToolbox()
    //   } else if (this.selected) {
    //     // this.hideSelectToolbox()
    //     this.selected = false
    //   }
    // }

    const contentState = editorState.getCurrentContent()

    // console.log(editorState);
    // return;
    // const oldContent = this.state.editorState.getCurrentContent()

    // if (contentState === oldContent || !this.maxLength || contentState.getPlainText().length <= this.maxLength) {
    this.setState({ editorState }, () => {
      const currentUnix = ~~(Date.now() / 1000)

      // if (currentUnix >= this.nextCallBackTime) {
        if (this.props.callBackSaveData)
          this.props.callBackSaveData(convertToRaw(contentState))
        this.nextCallBackTime = currentUnix + 10 // Adding delay for next callback
      // }
    })
    // }
  }

  handleBeforeInput = (chars) => {
    if (!this.maxLength) return false

    const totalLength = this.state.editorState.getCurrentContent().getPlainText().length + chars.length

    return totalLength > this.maxLength
  }

  handlePastedText = (text) => {
    if (!this.maxLength) return false

    const totalLength = this.state.editorState.getCurrentContent().getPlainText().length + text.length

    return totalLength > this.maxLength
  }

  onFocus = () => {
    this.focused = true
    this.setState({
      focused: true
    })
  }

  onBlur = () => {
    this.focused = false
    this.setState({
      focused: false
    })

    this.selected = false
    this.props.callBackSaveData(this)
  }

  focusOnEditor = () => {
    this.editorInput.current.focus()
  }

  render() {
    const { type, readOnly, value } = this.props
    const style = styles[`postContent${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`]

    // if (!store.user.isEditing || !store.post.isOwner || noEdit) {
    //   return (
    //     <div>
    //       <PostContentBlock
    //         className={[style]}
    //         noHeading={true}>
    //         <Editor
    //           readOnly={true}
    //           editorState={editorState}
    //           ref={this.editorInput}
    //           placeholder={type == 'title' ? 'Title' : 'Write your story...'}
    //           blockStyleFn={() => (`${styles.postContent} ${styles[type]}`)}
    //         />
    //       </PostContentBlock>
    //     </div>
    //   )
    // }

    let editorState = value != null
        ? EditorState.createWithContent(ContentState.createFromText(value))
        : EditorState.createEmpty()

    return (
      <div>
        <PostContentBlock
          heading={`${type == 'content' ? 'Your' : ''} ${type}`}
          noHeading={readOnly}
          onClick={this.focusOnEditor}
          className={[style]}>
          <Editor
            editorState={editorState}
            ref={this.editorInput}
            onChange={this.onChange}
            readOnly={readOnly != undefined ? readOnly : false}
            // onFocus={this.onFocus}
            // onBlur={this.onBlur}
            // spellCheck={true}
            placeholder={type == 'title' ? 'Title' : 'Write your story...'}
            // handleBeforeInput={this.handleBeforeInput}
            // handlePastedText={this.handlePastedText}
            blockStyleFn={() => (`${styles.postContent} ${styles[type]}`)}
          />
          {/* { type != 'title' && this.inlineStyleControls()} */}
        </PostContentBlock>
      </div>
    )
  }
}

export default PostContent
