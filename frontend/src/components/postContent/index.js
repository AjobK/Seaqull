import React, { Component, createRef } from 'react'
import { inject, observer } from 'mobx-react'
import PostContentBlock from '../postContentBlock'
import { EditorState, convertToRaw, ContentState, RichUtils } from 'draft-js'
import Editor from '@draft-js-plugins/editor'
import '@draft-js-plugins/inline-toolbar/lib/plugin.css'
import 'draft-js/dist/Draft.css'
import '../../DraftFallback.css'
import styles from './postContent.scss'
import createInlineToolbarPlugin, { Separator } from '@draft-js-plugins/inline-toolbar'
import { DraftJsTooltipButton } from '../../components'
import { HeadlineOneButton, HeadlineThreeButton, HeadlineTwoButton } from '@draft-js-plugins/buttons'

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

    this.inlineToolbarPlugin = createInlineToolbarPlugin()
    this.PluginComponents = {
      InlineToolbar: this.inlineToolbarPlugin.InlineToolbar
    }

    this.plugins = [this.inlineToolbarPlugin]

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
    text.removeInlineStyle()
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

  onToggleInlineStyling = (styling, e) => {
    e.preventDefault()
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, styling))
  }

  onToggleBlockStyling = (styling, e) => {
    e.preventDefault()
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, styling))
  }

  getBlockStyle = (block) => {
    switch (block.getType()) {
      case 'left':
        return 'DraftEditor-alignLeft'
      case 'center':
        return 'DraftEditor-alignCenter'
      case 'right':
        return 'DraftEditor-alignRight'
      default:
        return null
    }
  }

  render() {
    const { type, readOnly } = this.props

    const style = styles[`postContent${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`]

    const { InlineToolbar } = this.PluginComponents

    return (
      <div>
        <PostContentBlock
          heading={ `${type == 'content' ? 'Your' : ''} ${type}` }
          noHeading={ readOnly }
          // onClick={this.focusOnEditor}
          className={ [style] }
        >
          <Editor
            editorState={ this.state.editorState }
            ref={ (element) => {
              this.editor = element
            } }
            onChange={ this.onChange }
            readOnly={ readOnly !== undefined ? readOnly : false }
            onFocus={ this.onFocus }
            onBlur={ this.onBlur }
            spellCheck={ true }
            placeholder={ type === 'title' ? 'Title' : 'Write your story...' }
            stripPastedStyles={ true }
            handleBeforeInput={ this.handleBeforeInput }
            handlePastedText={ this.handlePastedText }
            blockStyleFn={ this.getBlockStyle }
            plugins={ this.plugins }
          />

          { type === 'content' &&
          <InlineToolbar>
            {
              (externalProps) => (
                <>
                  <DraftJsTooltipButton
                    iconName={ 'Bold' }
                    onButtonClick={ (e) => this.onToggleInlineStyling('BOLD', e) }
                  />
                  <DraftJsTooltipButton
                    iconName={ 'Italic' }
                    onButtonClick={ (e) => this.onToggleInlineStyling('ITALIC', e) }
                  />
                  <DraftJsTooltipButton
                    iconName={ 'Underline' }
                    onButtonClick={ (e) => this.onToggleInlineStyling('UNDERLINE', e) }
                  />
                  <Separator />
                  <HeadlineOneButton { ...externalProps } />
                  <HeadlineTwoButton { ...externalProps } />
                  <HeadlineThreeButton { ...externalProps } />
                  <Separator />
                  <DraftJsTooltipButton
                    iconName={ 'AlignLeft' }
                    onButtonClick={ (e) => this.onToggleBlockStyling('left', e) }
                  />
                  <DraftJsTooltipButton
                    iconName={ 'AlignCenter' }
                    onButtonClick={ (e) => this.onToggleBlockStyling('center', e) }
                  />
                  <DraftJsTooltipButton
                    iconName={ 'AlignRight' }
                    onButtonClick={ (e) => this.onToggleBlockStyling('right', e) }
                  />
                </>
              )
            }
          </InlineToolbar>
          }

          {/*{ type != 'title' && this.inlineStyleControls()}*/}
        </PostContentBlock>
      </div>
    )
  }
}

export default PostContent
