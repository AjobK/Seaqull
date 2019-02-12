import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './loader.scss'

@inject('store') @observer
class Loader extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.loader}>
          <div className={styles.loaderImage} />
        </div>
      </div>
    )
  }
}

export default Loader
