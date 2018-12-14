import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
            ].join(' ')}>
                {value || 'Button'}
            </li>
        )
    }
}

Button.propTypes = {
    value: PropTypes.string,
    className: PropTypes.string,
    noStyle: PropTypes.bool,
    inverted: PropTypes.bool
}

export default Button
