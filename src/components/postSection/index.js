import React, { Component } from 'react'
import styles from './postSection.scss'
import { PostEditHeading } from '..';
import { inject, observer } from 'mobx-react'

@inject('store') @observer
class PostSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false
    }
  }

  render() {
    const { user } = this.props.store
    const { paragraph, className } = this.props

    return (
      <section className={styles.paragraphWrapper}>
        {user.loggedIn && <PostEditHeading editing={true} />}

        <p className={[styles.paragraph, ...className || ''].join(' ')}>{paragraph ||
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}</p>
      </section>
    )
  }
}

export default PostSection
