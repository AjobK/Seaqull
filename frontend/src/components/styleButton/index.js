import React, { Component } from 'react'
import { Icon } from '..';
import styles from './styleButton.scss'

class StyleButton extends Component {
  constructor() {
    super()
    this.onToggle = (e) => {
      e.preventDefault()
      this.props.onToggle(this.props.style);
    }
  }

  render() {
    const { className, label, iconName } = this.props

    if (iconName) {
      return (
        <Icon
          iconName={iconName}
          onMouseDown={this.onToggle}
          className={[styles.button, ...className].join(' ')}
        />
      )
    }

    return (
      <span onMouseDown={this.onToggle} className={[styles.button, ...className].join(' ')}>
        { label }
      </span>
    )
  }
}

export default StyleButton
