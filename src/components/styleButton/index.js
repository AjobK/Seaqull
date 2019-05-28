import React, { Component } from 'react'
import styles from './StyleButton.scss'

class StyleButton extends Component {
  constructor() {
    super()
    this.onToggle = (e) => {
      e.preventDefault()
      this.props.onToggle(this.props.style);
    }
  }

  render() {
    return (
      <span onMouseDown={this.onToggle} className={styles.button}>
        { this.props.label }
      </span>
    )
  }
}

export default StyleButton
