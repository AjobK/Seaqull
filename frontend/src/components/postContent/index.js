import React, { Component, createRef } from 'react'
import styles from './postContent.scss'
import { inject, observer } from 'mobx-react'
import PostContentBlock from '../postContentBlock'
import { EditorState, Editor, convertToRaw, ContentState } from 'draft-js'
import '../../DraftFallback.css'
import { StyleUtil } from '../../util'

@inject('store')
@observer
class PostContent extends Component {
  constructor(props) {
    super(props)
    const { type } = this.props

    this.type = type || 'content'
    this.selected = false
    this.maxLength = this.type == 'title' ? 128 : null
    this.elRef = createRef()
    this.nextCallBackTime = ~~(Date.now() / 1000) + 10

    this.editorInput = React.createRef()

    this.state = {
      editorState: EditorState.createEmpty(),
      focused: false,
      toolTipPosition: {
        top: -9999,
        bottom: -9999,
        left: -9999,
        right: -9999,
        display: 'none',
      },
    }
  }

  onChange = (editorState) => {
    this.setState({ editorState }, () => this.props.callBackSaveData(convertToRaw(editorState.getCurrentContent())))
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
      focused: true,
    })
  }

  onBlur = () => {
    this.focused = false
    this.setState({
      focused: false,
    })

    this.selected = false
    this.props.callBackSaveData(this)
  }

  focusOnEditor = () => {
    this.editorInput.current.focus()
  }

  generateTypeStyle = (typeValue) => {
    return styles[
      StyleUtil.generateStyleString('postContent', typeValue)
    ]
  }

  componentDidMount() {
    let eState =
      typeof this.props.value == 'string'
        ? EditorState.createWithContent(ContentState.createFromText(this.props.value))
        : EditorState.createWithContent(ContentState.createFromText(JSON.stringify(this.props.value)))

    try {
      eState = EditorState.createWithContent(this.props.value)
    } catch (e) {}

    this.setState({ editorState: eState }, () => this.props.callBackSaveData(convertToRaw(eState.getCurrentContent())))
  }

  render() {
    const { type, readOnly } = this.props

    return (
      <div>
        <PostContentBlock
          heading={ `${type == 'content' ? 'Your' : ''} ${type}` }
          noHeading={ readOnly }
          // onClick={this.focusOnEditor}
          className={ [this.generateTypeStyle(this.type)] }
        >
          <Editor
            editorState={ this.state.editorState }
            ref={ this.editorInput }
            onChange={ this.onChange }
            readOnly={ readOnly != undefined ? readOnly : false }
            // onFocus={this.onFocus}
            // onBlur={this.onBlur}
            spellCheck={ true }
            placeholder={ type == 'title' ? 'Title' : 'Write your story...' }
            handleBeforeInput={ this.handleBeforeInput }
            handlePastedText={ this.handlePastedText }
            blockStyleFn={ () => `${styles.postContent} ${styles[type]}` }
          />
          {/* { type != 'title' && this.inlineStyleControls()} */}
        </PostContentBlock>
      </div>
    )
  }
}

export default PostContent
