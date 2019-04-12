import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './insertContent.scss'
import { Icon } from '..';

@inject('store') @observer
class InsertContent extends Component {
  render() {

    return (
      <div className={styles.container}>
        <h3 className={styles.title}>INSERT CONTENT</h3>
        <div className={styles.insert}>
          <span className={styles.insertButtonTitle}>TITLE</span>
          <span className={styles.insertButtonText}>TEXT</span>
          <span className={styles.insertButtonImg}>IMG</span>
        </div>
        <div className={styles.save}>
          <span className={styles.saveButton}>Save Changes</span><span className={styles.insertButtonEye}><Icon iconName={'Eye'}/></span>
        </div>
      </div>
    )
  }
}

export default InsertContent

