import React, { Component } from 'react'
import styles from './button.scss'

class Button extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        const { value, className, noStyle, inverted } = this.props
        return (
            <li className={[
                className,
                !noStyle && styles.button,
                !noStyle && inverted && styles.inverted
            ].join(' ')} onClick={this.props.onClick}>
                {value || 'Button'}
            </li>
        )
    }
}

export default Button
