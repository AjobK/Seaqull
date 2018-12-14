import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './button.scss'

class Button extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        const { value, className, noStyle } = this.props
        return (
            <li className={`${className} ${!noStyle && styles.button}`}>
                {value || 'Button'}
            </li>
        )
    }
}

Button.propTypes = {
    value: PropTypes.string,
    className: PropTypes.array,
    noStyle: PropTypes.bool
}

export default Button
