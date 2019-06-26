import React, { Component, createRef } from 'react'
import styles from './postContent.scss'
import { StyleButton } from '../'
import { inject, observer } from 'mobx-react'
import PostContentBlock from '../postContentBlock'
import { EditorState, Editor, RichUtils } from 'draft-js'
import '../../DraftFallback.css'
import ReactTooltip from 'react-tooltip'

@inject('store') @observer
class PostContent extends Component {
  constructor(props) {
    super(props)
    const { type, cbKey, value } = this.props

    this.type = type || 'story'

    this.maxLength = this.type == 'title' ? 128 : null

    this.elRef = createRef()
    this.nextCallBackTime = ~~(Date.now() / 1000) + 10

    this.editorInput = React.createRef()

    this.state = {
      editorState: value != null
        ? EditorState.createWithContent(value)
        : EditorState.createEmpty(),
      focused: false
    }
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

    return totalLength > this.maxLength
  }

  handlePastedText = (text) => {
    if (!this.maxLength) return false

    const totalLength = this.state.editorState.getCurrentContent().getPlainText().length + text.length

    return totalLength > this.maxLength
  }

  toggleInlineStyle = (inlineStyle) => {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    )
  }

  InlineStyleControls = () => {
    let INLINE_STYLES = [
      { label: 'Bold', style: 'BOLD' },
      { label: 'Italic', style: 'ITALIC' },
      { label: 'Underline', style: 'UNDERLINE' },
      { label: 'Monospace', style: 'CODE' }
    ]

    const currentStyle = this.state.editorState.getCurrentInlineStyle()

    return (
      // <ReactTooltip>
          <div className={`${styles.controls} ${this.state.focused && styles.controlsOn}`}>
          {INLINE_STYLES.map((type) =>
            <StyleButton
              className={[styles.controlsButtons]}
              key={type.label}
              active={currentStyle.has(type.style)}
              label={type.label}
              onToggle={this.toggleInlineStyle}
              style={type.style}
            />
          )}
        </div>
      // </ReactTooltip>
    )
  }

  onFocus = () => {
    this.setState({
      focused: true
    })
  }

  onBlur = () => {
    this.setState({
      focused: false
    })
    this.props.callBackSaveData(this)
  }

  focusOnEditor = () => {
    console.log('Focussing')
    this.editorInput.focus()
  }

  render() {
    const { type, store } = this.props
    const { editorState, focused } = this.state
    const style = styles[`postContent${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`]

    return (
      <PostContentBlock
        heading={`${type == 'story' ? 'Your' : ''} ${type}`}
        onClick={this.focusOnEditor}
        className={[style]}>
        {this.InlineStyleControls()}
        <Editor
          readOnly={!store.user.loggedIn}
          editorState={editorState}
          ref={this.editorInput}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          spellCheck={true}
          placeholder={type == 'title' ? 'Title' : 'Write your story...'}
          handleBeforeInput={this.handleBeforeInput}
          handlePastedText={this.handlePastedText}
          blockStyleFn={() => (`${styles.postContent} ${styles[type]}`)}
        />
      </PostContentBlock>
    )
  }
}

export default PostContent
