import React from 'react'
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard, Section } from '../../layouts'
import { PostBanner, PostContent, Button } from '../../components'
import { convertToRaw, convertFromRaw, RichUtils } from 'draft-js'
import styles from './post.scss'
import { findDOMNode } from 'react-dom'
import ReactTooltip from 'react-tooltip'
import { StyleButton } from '../../components'

@inject('store') @observer
class Post extends App {
  constructor(props) {
    super(props)

    let content = window.localStorage.getItem('content')

    if (!content || !JSON.parse(content)) {
      content = JSON.stringify({
        title: null,
        story: null
      })
      window.localStorage.setItem('content', content)
    }

    this.content = JSON.parse(content)
    this.toolTipRef = React.createRef()

    this.cbKey = 0
    this.state = {
      isPublished: true,
      renderContent: [],
      currentEditorState: null,
      toolTipPosition: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'none'
      }
    }
  }

  componentDidMount() {
    this.returnComponentsFromJson()
  }

  callBackSaveData = (item) => {
    const { editorState } = item.state
    const { type } = item.props

    this.content[type] = convertToRaw(editorState.getCurrentContent())
    this.sendDataToDB()
  }

  InlineStyleControls = () => {
    const { currentEditorState, toolTipPosition } = this.state
    const { top, bottom, left, right } = toolTipPosition

    if (!currentEditorState) return null

    let INLINE_STYLES = [
      { label: 'Bold', style: 'BOLD' },
      { label: 'Italic', style: 'ITALIC' },
      { label: 'Underline', style: 'UNDERLINE' },
      { label: 'Monospace', style: 'CODE' }
    ]

    const currentStyle = currentEditorState.getCurrentInlineStyle()

    return (
      <div
        className={`${styles.controls}`}
        style={{
          top: top - 40,
          left: left
        }}
      >
        {INLINE_STYLES.map((type) =>
          <StyleButton
            className={[styles.controlsButtons]}
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={() => {this.toggleInlineStyle(currentEditorState, type.style)}}
            style={type.style}
          />
        )}
      </div>
    )
  }

  toggleInlineStyle = (editorState, inlineStyle) => {
      RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
      )
  }

  showSelectToolbox = (item) => {
    const { editorState } = item.state

    let selection = window.getSelection()

    if (selection.anchorNode) {
      const { top, bottom, left, right } = selection.getRangeAt(0).getBoundingClientRect()

      this.setState({ currentEditorState: editorState, toolTipPosition: {top, bottom, left, right} })
    } else {
      this.setState({ currentEditorState: null })
    }


  }

  hideSelectToolbox = () => {
    this.setState({ currentEditorState: null, toolTipPosition: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: 'none'
    } })
    console.log('Hiding')
  }

  returnComponentsFromJson = (noSetState = false) => {
    let typeArr = ['title', 'story']
    let contentArr = []

    typeArr.forEach((type, i) => {
      contentArr.push(
        <PostContent
          key={i}
          type={type}
          callBackSaveData={this.callBackSaveData}
          showSelectToolbox={this.showSelectToolbox}
          hideSelectToolbox={this.hideSelectToolbox}
          value={this.content[type] ? convertFromRaw(this.content[type]) : null}
        />
      )
    })
    
    if (!noSetState) {
      this.setState({
        renderContent: contentArr
      }, () => {
        this.sendDataToDB()
      })
    } else {
      this.sendDataToDB()
    }
  }

  sendDataToDB() {
    // Send this data
    window.localStorage.setItem('content', JSON.stringify(this.content));
  }

  render() {
    const { isPublished } = this.state

    return (
      <Standard className={[styles.stdBgWhite]}>
        <PostBanner />
        <Section noTitle>
          <div className={styles.renderWrapper}>
            { this.state.renderContent }
          </div>
          {this.InlineStyleControls()}
          <Button
            className={[styles.publishButton, isPublished ? styles.published : ''].join(' ')}
            value={isPublished ? 'UNPUBLISH STORY': 'PUBLISH STORY'}
            />
        </Section>
      </Standard>
    )
  }
}

export default Post
