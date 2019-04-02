import React, { Component } from 'react'
import styles from './postHeader.scss'
import { Icon } from '..';
import { inject, observer } from 'mobx-react'

@inject('store') @observer
class PostHeader extends Component {
  render() {
    const { user } = this.props.store
    const { heading, className } = this.props

    return (
      <section className={styles.title}>
        {user.loggedIn && <span className={styles.titleEdit}><Icon iconName={'Pen'} /> Heading </span>}
        <h3 className={[styles.title, ...className || ''].join(' ')}>{heading || 'Sample title'}</h3>
      </section>
    )
  }
}

export default PostHeader