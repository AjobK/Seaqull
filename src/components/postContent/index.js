import React, { Component } from 'react'
import styles from './postContent.scss'
import { inject, observer } from 'mobx-react'
import PostContentBlock from '../postContentBlock'
import ContentEditable from 'react-contenteditable'
import update from 'react-addons-update'; // ES6
import sanitizeHtml from 'sanitize-html'
import { array } from 'mobx-state-tree/dist/internal';

@inject('store') @observer
class PostContent extends Component {  
  constructor(props) {
    super(props)
    this.type = this.props.type || 'paragraph'
    this.sanitizeFilter = {
      paragraph: {
        allowedTags: [ 'br', 'b', 'i', 'em', 'strong' ]
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

  setValue = (e) => {
    this.setState({
      value: sanitizeHtml(e.target.value, this.sanitizeFilter[this.type])
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
    this.setState({
      undoList: update(this.state.undoList,
        { [this.state.undoList.length]: 
          { $set: sanitizeHtml(this.state.value) }
        })
    })
  }

  keyDown = (e) => {
    if (e.keyCode == 90 && e.ctrlKey && this.state.undoList.length >= 0) {
      console.log(this.state.undoList)
      e.preventDefault()
      this.undo()
    } else if (!e.ctrlKey && e.keyCode == 32) {
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
        />
      </PostContentBlock>
    )
  }
}

export default PostContent
