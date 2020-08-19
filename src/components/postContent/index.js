import React, { Component, createRef } from 'react'
import styles from './postContent.scss'
import { inject, observer } from 'mobx-react'
import PostContentBlock from '../postContentBlock'
import { EditorState, Editor, RichUtils } from 'draft-js'
import '../../DraftFallback.css'
import { StyleButton } from '../../components'

@inject('store') @observer
class PostContent extends Component {
  constructor(props) {
    super(props)
    const { type, value } = this.props

    this.type = type || 'story'
    this.selected = false
    this.maxLength = this.type == 'title' ? 128 : null
    this.elRef = createRef()
    this.nextCallBackTime = ~~(Date.now() / 1000) + 10

    this.editorInput = React.createRef()

    this.state = {
      editorState: value != null
        ? EditorState.createWithContent(value)
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
    if (this.focused) {
      let selectedText = window.getSelection().toString()

      if (selectedText.trim().length) {
        this.selected = true
        // this.showSelectToolbox()
      } else if (this.selected) {
        // this.hideSelectToolbox()
        this.selected = false
      }
    }

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

  // turnEditingOn = () => {
  //   const { setEditingElement } = this.props.store.post

  //   setEditingElement(this.type)
  // }

  // turnEditingOff = () => {
  //   const { setEditingElement } = this.props.store.post

  //   setEditingElement('')
  // }

  // inlineStyleControls = () => {
  //   const { focused, toolTipPosition, editorState } = this.state
  //   const { editingElement } = this.props.store.post
  //   let { top, left, right } = toolTipPosition

  //   if (!focused && !editingElement) return null

  //   let INLINE_STYLES = [
  //     { label: 'Bold', style: 'BOLD' },
  //     { label: 'Italic', style: 'ITALIC' },
  //     { label: 'Underline', style: 'UNDERLINE' },
  //     { label: 'Code', style: 'CODE' }
  //   ]

  //   const currentStyle = editorState.getCurrentInlineStyle()

  //   let centeredPosition = ((left + right) / 2 - (125/2))

  //   return (
  //     <div
  //       className={`${styles.controls}`}
  //       style={{
  //         top: top - 50,
  //         left: centeredPosition
  //       }}
  //     >
  //       <div className={styles.controlsChoices} onMouseEnter={this.turnEditingOn} onMouseLeave={this.turnEditingOff} onClick={this.turnEditingOn}>
  //         {INLINE_STYLES.map((type) =>
  //           <StyleButton
  //             className={[styles.controlsButtons]}
  //             key={type.label}
  //             active={currentStyle.has(type.style)}
  //             label={type.label}
  //             onToggle={() => {this.toggleInlineStyle(editorState, type.style)}}
  //             style={type.style}
  //             iconName={type.label}
  //           />
  //         )}
  //       </div>
  //       <div className={styles.controlsArrow} />
  //     </div>
  //   )
  // }

  // toggleInlineStyle = (editorState, inlineStyle) => {
  //     RichUtils.toggleInlineStyle(
  //       editorState,
  //       inlineStyle
  //     )
  // }

  // showSelectToolbox = () => {
  //   let selection = window.getSelection()

  //   if (selection.anchorNode) {
  //     const { top, bottom, left, right } = selection.getRangeAt(0).getBoundingClientRect()

  //     this.setState({ toolTipPosition: { top, bottom, left, right } })
  //   }
  // }

  // hideSelectToolbox = () => {
  //   const { editingElement } = this.props.store.post

  //   if (editingElement == this.type) return

  //   this.setState({ toolTipPosition: {
  //     top: -9999,
  //     bottom: -9999,
  //     left: -9999,
  //     right: -9999,
  //     display: 'none'
  //   } })
  // }

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
    const { type, store } = this.props
    const { editorState } = this.state
    const style = styles[`postContent${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`]

    if (!store.user.isEditing || !store.post.isOwner) {
      return (
        <div>
          <PostContentBlock
            className={[style]}
            noHeading={true}>
            <Editor
              readOnly={true}
              editorState={editorState}
              ref={this.editorInput}
              placeholder={type == 'title' ? 'Title' : 'Write your story...'}
              blockStyleFn={() => (`${styles.postContent} ${styles[type]}`)}
            />
          </PostContentBlock>
        </div>
      )
    }

    return (
      <div>
        <PostContentBlock
          heading={`${type == 'story' ? 'Your' : ''} ${type}`}
          onClick={this.focusOnEditor}
          className={[style]}>
          <Editor
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
          {/* { type != 'title' && this.inlineStyleControls()} */}
        </PostContentBlock>
      </div>
    )
  }
}

export default PostContent
