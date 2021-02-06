import React, { Component } from 'react'
import styles from './PostContentBlock.scss'
import { PostEditHeading } from '..';
import { inject, observer } from 'mobx-react'

@inject('store') @observer
class PostContentBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
  }

  edit = () => {
    this.setState({
      editing: true
    })
  }

  quitEdit = () => {
    this.setState({
      editing: false
    })
  }

  render() {
    const { children, heading, className, onClick, noHeading } = this.props

    return (
      <section className={styles.paragraphWrapper} onClick={onClick}>
        {!noHeading && <PostEditHeading editing={this.state.editing} heading={heading} />}
        <div className={[styles.paragraph, ...className || ''].join(' ')} onFocus={this.edit} onBlur={this.quitEdit}>
          {
            children || <p> NO CONTENT </p>
          }
        </div>
      </section>
    )
  }
}

export default PostContentBlock
