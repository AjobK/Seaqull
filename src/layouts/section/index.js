import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './section.scss'
import { Title } from '../../components'

@inject('store') @observer
class Section extends Component {
  render() {
    const { title, children } = this.props

    return (
      <section className={styles.wrapper}>
        <Title value={title} />
        <div className={styles.content}>
          { children }
        </div>
      </section>
    )
  }
}

export default Section
