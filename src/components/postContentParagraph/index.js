import React, { Component } from 'react'
import styles from './postContentParagraph.scss'
import { inject, observer } from 'mobx-react'
import PostContentBlock from '../postContentBlock'
import ContentEditable from 'react-contenteditable'

@inject('store') @observer
class PostContentParagraph extends Component {  
  constructor(props) {
    super(props)
    this.type = 'paragraph'
    this.state = {
      value: props.value || ''
    }
  }

  onClick = () => {
    this.callBackData()
  }

  setValue = (e) => {
    this.setState({
      value: e.target.value
    }, () => {
      this.callBackData()
    })
  }

  callBackData = () => {
    if (this.props.theCB)
      this.props.theCB(this)
  }

  render() {
    return (
      <>
        <PostContentBlock heading={'paragraph'}>
          <ContentEditable onClick={this.onClick} html={this.state.value || ''} onChange={this.setValue}/>
        </PostContentBlock>
        <br />
      </>
    )
  }
}

export default PostContentParagraph
