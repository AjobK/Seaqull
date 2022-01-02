import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from './standard.scss'

@inject('store') @observer
class Standard extends Component {
  render() {
    const { className } = this.props

    return (
      <section className={ [styles.wrapper, ...(className ? className : [''])].join(' ') }>
        <div className={ styles.innerWrapper }>
          { this.props.children }
        </div>
      </section>
    )
  }
}

export default Standard
