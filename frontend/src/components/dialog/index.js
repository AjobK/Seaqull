import React, { Component } from 'react'
import styles from './dialog.scss'

class Dialog extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={ styles.dialog }>
                <div className={ styles.dialogBackground } onClick={ this.props.onCloseCallback } />
                <div className={ styles.dialogHeader }>
                    <h2>{this.props.header}</h2>
                </div>
                <div className={ styles.dialogBody }>
                    <p>{ this.props.body }</p>
                </div>
            </div>
        )
    }

}

export default Dialog