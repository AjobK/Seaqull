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
    const { user } = this.props.store
    const { children, heading, className } = this.props

    return (
      <section className={styles.paragraphWrapper} onClick={this.edit} onBlur={this.quitEdit}>
        {user.loggedIn && <PostEditHeading editing={this.state.editing} heading={heading} />}
        {
          children ||
          <p className={[styles.paragraph, ...className || ''].join(' ')}> NO CONTENT </p>
        }
      </section>
    )
  }
}

export default PostContentBlock
