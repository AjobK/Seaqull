import React, { Component } from 'react'
import styles from './title.scss'

class Title extends Component {
  render() {
    const { value, className, center } = this.props

    return (
      <h2 className={[styles.title, center ? styles.center : '', ...className || ''].join(' ')}>{value || 'Sample title'}</h2>
    )
  }
}

export default Title
