import React, { Component } from 'react'
import styles from './postEditHeading.scss'
import { Icon } from '..';
import { inject, observer } from 'mobx-react'

@inject('store') @observer
class PostEditHeading extends Component {
  render() {
    const { heading, editing } = this.props
    let editingClass = [styles.edit, this.props.editing ? styles.editing : ''].join(' ')

    return (
      <span className={editingClass}>
        <Icon iconName={'Pen'} className={styles.icon} /> {heading || 'Text'} { editing && ' - Editing'}
      </span>
    )
  }
}

export default PostEditHeading
