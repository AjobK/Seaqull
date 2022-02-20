import React, { Component } from 'react'
import styles from './postContent.scss'
import { inject, observer } from 'mobx-react'
import PostContentBlock from '../postContentBlock'
import { EditorState, Editor, convertToRaw, convertFromRaw, ContentState } from 'draft-js'
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
    this.nextCallBackTime = ~~(Date.now() / 1000) + 10

    this.editorInput = React.createRef()
    this.wasReadOnly = false

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

  // TODO: Make safe
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { callBackGetData, canceled, type } = nextProps

    if (type == 'content') {
      let calledBackData = callBackGetData()

      if (canceled && calledBackData)
        this.setContent(calledBackData)
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

  setContent(content) {
    const { callBackSaveData } = this.props
    let convertedContent = convertFromRaw(content)

    try {
      let eState = EditorState.createWithContent(
        convertedContent
      )

      callBackSaveData(content)

      this.setState({ editorState: eState })
    } catch (e) { }
  }

  componentDidMount() {
    let eState =
      typeof this.props.value == 'string'
        ? EditorState.createWithContent(ContentState.createFromText(this.props.value))
        : EditorState.createWithContent(ContentState.createFromText(JSON.stringify(this.props.value)))

    this.wasReadOnly = this.props.readOnly

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
          noHeading
          // onClick={this.focusOnEditor}
          className={ [this.generateTypeStyle(this.type)] }
        >
          <Editor
            editorState={ this.state.editorState }
            ref={ this.editorInput }
            onChange={ this.onChange }
            readOnly={ readOnly }
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
