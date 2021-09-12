import React, { Component } from 'react'
import styles from './dialog.scss'

import { Button } from '../'

class Dialog extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.dialog}>
        <div className={styles.dialogBackground} onClick={this.props.onCloseCallback} />
        <div className={styles.dialogWrapper}>
          <div className={styles.dialogHeader}>
            <h2>{this.props.header}</h2>
          </div>
          <div className={styles.dialogBody}>
            <p>{this.props.body}</p>
          </div>
          <div className={styles.dialogButtons}>
            <Button className={styles.dialogCancelButton} onClick={this.props.onCloseCallback} value="Cancel" />
            <Button
              className={styles.dialogConfirmButton}
              onClick={this.props.onConfirmCallback}
              value={this.props.confirmText || 'Confirm'}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Dialog
