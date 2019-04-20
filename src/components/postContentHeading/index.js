import React, { Component } from 'react'
import styles from './postContentHeading.scss'
import { inject, observer } from 'mobx-react'
import PostContentBlock from '../postContentBlock';

@inject('store') @observer
class PostContentHeading extends Component {
  constructor(props) {
    super(props)
    this.type = 'heading'
    this.state = {
      value: props.value || ''
    }
  }

  callBackData = () => {
    if (this.props.theCB)
      this.props.theCB(this)
  }

  render() {
    if (this.props.cbKey == 1) {
      let a = this

      setTimeout(() => {
        a.setState({ value: 'Another value' })
      }, 2000)
    }

    return (
      <PostContentBlock heading={'heading'}>
        <h3 className={styles.title} onClick={this.callBackData}>{this.state.value || 'Sample title'}</h3>
      </PostContentBlock>
    )
  }
}

export default PostContentHeading
