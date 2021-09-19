import React, { Component } from 'react'
import styles from './button.scss'
import { Icon } from '../index'

class Button extends Component {
  render() {
    const { value, noStyle, inverted, className, onClick, onSubmit, submit, disabled, icon } = this.props

    return (
      <button
        className={ [
          className,
          disabled ? styles.disabled : styles.pulse,
          !noStyle && styles.button,
          !noStyle && inverted && styles.inverted,
          value && icon ? styles.iconWithText : styles.iconWithoutText,
        ].join(' ') }
        onClick={ onClick }
        onSubmit={ onSubmit }
        type={ submit && 'submit' }
      >
        { icon && (
          <span className={ styles.icon }>
            <Icon iconName={ icon } />
          </span>
        ) }
        { value && value }
      </button>
    )
  }
}

export default Button
