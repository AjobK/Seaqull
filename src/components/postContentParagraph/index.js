import React, { Component } from 'react'
import styles from './postContentParagraph.scss'
import { inject, observer } from 'mobx-react'
import PostContentBlock from '../postContentBlock';

@inject('store') @observer
class PostContentParagraph extends Component {  
  constructor(props) {
    super(props)
    this.type = 'paragraph'
    this.state = {
      value: props.value || ''
    }
  }

  callBackData = () => {
    if (this.props.theCB)
      this.props.theCB(this)
  }

  render() {
    return (
      <PostContentBlock heading={'paragraph'}>
        <p className={styles.paragraph} onClick={this.callBackData}>{this.state.value || 'Sample paragraph'}</p>
      </PostContentBlock>
    )
  }
}

export default PostContentParagraph
