import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './banner.scss'

class Button extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        const { Title, description, className } = this.props
        return (
            <div className={styles.wrapper}>
                <h2 className={[className].join(' ')}>
                    {Title || 'Title'}
                </h2>
                <h3 className={[className].join(' ')}>
                    {description || 'Description'}
                </h3>
            </div>

        )
    }
}

Button.propTypes = {
    Title: PropTypes.string,
    description: PropTypes.string,
    className: PropTypes.string,
}

export default Button
