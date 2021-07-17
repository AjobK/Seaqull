import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styles from './popUp.scss'

@inject('store') @observer
class PopUp extends Component {
    constructor(props) {
        super(props)

        this.setScrollDisabled(true)

        this.state = {
        }
    }

    componentDidMount() {

    }

    setScrollDisabled = (scrollDisabled) => {
        document.body.style.overflow = scrollDisabled ? 'hidden' : 'unset'
    }

    render() {
        return (
            <div className={ styles.popUpWrapper }>
                <div className={ styles.popUpBackground } onClick={ this.props.close } />
                <div className={ styles.popUp }>
                    { this.props.title && (
                        <h2 className={ styles.popUpTitle }>
                            { this.props.title }
                        </h2>
                    )}
                    { this.props.description && (
                        <p className={ styles.popUpDescription }>
                            { this.props.description }
                        </p>
                    )}
                    {/*{ this.props.children }*/}
                </div>
            </div>
        )
    }
}

export default PopUp
