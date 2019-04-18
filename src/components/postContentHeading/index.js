import React, { Component } from 'react'
import styles from './postContentHeading.scss'
import { inject, observer } from 'mobx-react'
import PostContentBlock from '../postContentBlock';

@inject('store') @observer
class PostContentHeading extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || ''
    }
    this.myRef = React.createRef();
  }

  getValue() {
    return this.state.value
  }

  render() {
    if (this.props.theCB)
      this.props.theCB()

    return (
      <PostContentBlock heading={'heading'} ref={this.myRef}>
        <h3 className={styles.title}>{this.state.value || 'Sample title'}</h3>
      </PostContentBlock>
    )
  }
}

export default PostContentHeading
