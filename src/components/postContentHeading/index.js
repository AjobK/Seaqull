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

  callBackData = () => {
    if (this.props.theCB)
      this.props.theCB(this.state.value)
  }

  render() {
    let a = this
    setTimeout(() => {
      a.setState({ value: 'Another value' })
    }, 2000)

    return (
      <PostContentBlock heading={'heading'} ref={this.myRef}>
        <h3 className={styles.title} onClick={this.callBackData}>{this.state.value || 'Sample title'}</h3>
      </PostContentBlock>
    )
  }
}

export default PostContentHeading
