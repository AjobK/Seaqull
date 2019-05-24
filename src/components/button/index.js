import React, { Component } from 'react'
import styles from './button.scss'

class Button extends Component {
  render() {
    const { value, noStyle, inverted, className, onClick, onSubmit, submit } = this.props

    return (
      <button 
        className={[
          className,
          !noStyle && styles.button,
          !noStyle && inverted && styles.inverted
        ].join(' ')}
        onClick={onClick}
        onSubmit={onSubmit}
        type={submit && 'submit'}>
        {value || 'Button'}
      </button>
    )
  }
}

export default Button
