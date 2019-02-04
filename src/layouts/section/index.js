import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './section.scss'

@inject('store') @observer
class Section extends Component {
  render() {
    return (
      <section className={styles.wrapper}>
        Section
      </section>
    )
  }
}

export default Section
