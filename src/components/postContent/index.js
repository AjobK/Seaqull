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
        this.showSelectToolbox()
      } else if (this.selected) {
        this.hideSelectToolbox()
        this.selected = false
      }
      console.log(selectedText)
      console.log(selectedText.trim().length)
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

  inlineStyleControls = () => {
    const { focused, toolTipPosition, editorState } = this.state
    let { top, left, right } = toolTipPosition

    if (!focused) return null

    let INLINE_STYLES = [
      { label: 'Bold', style: 'BOLD' },
      { label: 'Italic', style: 'ITALIC' },
      { label: 'Underline', style: 'UNDERLINE' },
      { label: 'Code', style: 'CODE' }
    ]

    const currentStyle = editorState.getCurrentInlineStyle()


    let centeredPosition = ((left + right) / 2 - (125/2))
    // centeredPosition = ((left + window.innerWidth) / 2 - (125/2)) - 20
    // console.log((centeredPosition + 63) + ' ' + window.innerWidth)

    console.log('-----------')
    console.log((centeredPosition + 125))
    console.log(window.innerWidth)
    console.log('-----------')
    if ((centeredPosition + (125/2) + 20) > window.innerWidth) {
      console.log('UIT SCHERM! (RECHTS)')
    } else {
      console.log('IN SCHERM')
    }
    // console.log((right + (125/2) + 20) + ' ' + window.innerWidth)
    // if (centeredPosition + 20 > window.innerWidth)
    //   console.log('WRONGGG')
    // else
    //   centeredPosition = ((left + right) / 2 - (125/2))
      
    // centeredPosition = ((left + right) / 2 - (125/2))

    return (
      <div
        className={`${styles.controls}`}
        style={{
          top: top - 50,
          left: centeredPosition
        }}
      >
        <div className={styles.controlsChoices}>
          {INLINE_STYLES.map((type) =>
            <StyleButton
              className={[styles.controlsButtons]}
              key={type.label}
              active={currentStyle.has(type.style)}
              label={type.label}
              onToggle={() => {this.toggleInlineStyle(editorState, type.style)}}
              style={type.style}
              iconName={type.label}
            />
          )}
        </div>
        <div className={styles.controlsArrow} />
      </div>
    )
  }
  
  toggleInlineStyle = (editorState, inlineStyle) => {
      console.log(editorState)
      RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
      )
  }

  showSelectToolbox = () => {
    let selection = window.getSelection()

    if (selection.anchorNode) {
      const { top, bottom, left, right } = selection.getRangeAt(0).getBoundingClientRect()

      this.setState({ toolTipPosition: { top, bottom, left, right } })
    }
  }

  hideSelectToolbox = () => {
    this.setState({ toolTipPosition: {
      top: -9999,
      bottom: -9999,
      left: -9999,
      right: -9999,
      display: 'none'
    } })
    console.log('Hiding')
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
    const { type, store } = this.props
    const { editorState } = this.state
    const style = styles[`postContent${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`]

    return (
      <div>
        <PostContentBlock
          heading={`${type == 'story' ? 'Your' : ''} ${type}`}
          onClick={this.focusOnEditor}
          className={[style]}>
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
          { type != 'title' && this.inlineStyleControls()}
        </PostContentBlock>
      </div>
    )
  }
}

export default PostContent
