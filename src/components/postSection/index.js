import React, { Component } from 'react'
import styles from './postSection.scss'
import { Icon } from '..';
import { inject, observer } from 'mobx-react'

@inject('store') @observer
class PostSection extends Component {
  render() {
    const { user } = this.props.store
    const { paragraph, className } = this.props

    return (
      <section className={styles.paragraphWrapper}>
        {user.loggedIn && <span className={styles.titleEdit}><Icon iconName={'Pen'} className={styles.icon} /> Paragraph </span>}
        <p className={[styles.paragraph, ...className || ''].join(' ')}>{paragraph ||
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}</p>
      </section>
    )
  }
}

export default PostSection