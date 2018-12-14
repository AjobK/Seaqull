import React, { Component } from 'react'
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

export default Button