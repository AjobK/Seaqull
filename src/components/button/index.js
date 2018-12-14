import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './button.scss'

class Button extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        return (
            <li className={styles.button}>
                {this.props.value || 'Button'}
            </li>
        )
    }
}

Button.propTypes = {
    value: PropTypes.string
}

export default Button
