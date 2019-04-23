import React, { Component, createRef } from 'react'
import styles from './postContent.scss'
import { inject, observer } from 'mobx-react'
import PostContentBlock from '../postContentBlock'
import ContentEditable from 'react-contenteditable'
import update from 'react-addons-update'; // ES6
import sanitizeHtml from 'sanitize-html'

@inject('store') @observer
class PostContent extends Component {  
  constructor(props) {
    super(props)
    this.type = this.props.type || 'paragraph'
    this.elRef = createRef()
    this.sanitizeFilter = {
      paragraph: {
        allowedTags: [ 'img', 'br', 'div', 'b', 'i', 'em', 'strong' ],
        allowedAttributes: {
          'img': ['src']
        },
        allowedIframeHostnames: ['www.youtube.com']
      }
    }
    this.state = {
      value: props.value || '',
      undoList: [props.value || '']
    }
  }

  onClick = () => {
    this.callBackData()
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

  // ContentEditable in combination with sanitizeHTML is really, really bad at undoing.
  // Therefore I have made my own functionalities to make sure this is done properly.

  undo = () => {
    console.log(this.state.undoList)
    this.setState({
      value: this.state.undoList[this.state.undoList.length - 1]
    }, () => {
      let tempArr = [...this.state.undoList]
      tempArr.splice(-1, 1)
      this.setState({
        undoList: tempArr
      })
    })
  }

  addUndo = () => {
    console.log(this.state.undoList)
    this.setState({
      undoList: update(this.state.undoList,
        { [this.state.undoList.length]: 
          { $set: sanitizeHtml(this.state.value, this.sanitizeFilter[this.type]) }
        })
    })
  }

  keyDown = (e) => {
    let dirty = this.elRef.current.innerText

    if (!dirty)
      return false

    this.setState({
      value: sanitizeHtml(dirty, this.sanitizeFilter[this.type])
      // value: e.target.value
    })

    if (e.keyCode == 90 && e.ctrlKey && this.state.undoList.length >= 0) {
      e.preventDefault()
      this.undo()
      console.log(this.state.undoList)
    } else if (!e.ctrlKey && e.keyCode == 32) {
      this.addUndo(this.state.value)
    } else if (!e.ctrlKey && e.keyCode == 13) {
      this.addUndo(this.state.value)
    } else if (e.ctrlKey && e.keyCode == 86) {
      this.addUndo(this.state.value)
    }
  }

  render() {
    const { type, store } = this.props

    return (
      <PostContentBlock heading={type}>
        <ContentEditable
          className={`${styles.postContent} ${styles[type]}`}
          onClick={this.onClick}
          html={this.state.value || ''}
          onChange={this.setValue}
          onKeyDown={this.keyDown}
          disabled={!store.user.loggedIn}
          innerRef={this.elRef}
        />
      </PostContentBlock>
    )
  }
}

export default PostContent
