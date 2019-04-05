import React, { Component } from 'react'
import styles from './postContentParagraph.scss'
import { inject, observer } from 'mobx-react'
import PostContentBlock from '../postContentBlock';

@inject('store') @observer
class PostContentParagraph extends Component {
  render() {
    return (
      <PostContentBlock heading={'paragraph'}>
        <p className={styles.paragraph}>{this.props.value || 'NO CONTENT'}</p>
      </PostContentBlock>
    )
  }
}

export default PostContentParagraph
