import React, { Component } from 'react'
import styles from './postEditHeading.scss'
import { Icon } from '..';
import { inject, observer } from 'mobx-react'

@inject('store') @observer
class PostEditHeading extends Component {
  constructor(props) {
    super(props)

    this.state = {
      manualEditing: false
    }
  }

  setManualEditingTrue = () => {
    if (this.state.manualEditing) return false
    this.setState({
      manualEditing: true
    })
  }

  setManualEditingFalse = () => {
    if (!this.state.manualEditing) return false
    this.setState({
      manualEditing: false
    })
  }

  render() {
    const { heading, editing, store } = this.props
    const { manualEditing } = this.state
    let editingClass = [styles.edit, (manualEditing || editing) ? styles.editing : ''].join(' ')

    return (
      <label className={editingClass}>
        <span><Icon iconName={'Pen'} className={styles.icon} /> {heading || 'Text'} { (manualEditing || editing) && '- Editing'}</span>
      </label>
    )
  }
}

export default PostEditHeading
