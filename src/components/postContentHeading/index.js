import React, { Component } from 'react'
import styles from './postContentHeading.scss'
import { inject, observer } from 'mobx-react'
import PostContentBlock from '../postContentBlock'
import ContentEditable from 'react-contenteditable'

@inject('store') @observer
class PostContentHeading extends Component {
  constructor(props) {
    super(props)
    this.type = 'heading'
    this.contentEditable = React.createRef()
    this.state = {
      value: props.value || ''
    }
  }

  callBackData = () => {
    if (this.props.theCB)
      this.props.theCB(this)
  }

  setValue = (e) => {
    this.setState({
      value: e.target.value
    }, () => {
      this.callBackData()
    })
  }

  render() {
    if (this.props.cbKey == 1) {
      let a = this

      setTimeout(() => {
        a.setState({ value: 'Another value' })
      }, 2000)
    }

    return (
      <>
        <PostContentBlock heading={'heading'}>
          <ContentEditable className={styles.title} onClick={this.callBackData} html={this.state.value || ''} onChange={this.setValue} />
        </PostContentBlock>
      </>
    )
  }
}

export default PostContentHeading
