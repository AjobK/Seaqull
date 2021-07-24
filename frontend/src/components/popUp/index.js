import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styles from './popUp.scss'
import {Button, Icon} from '../index'

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

    closePopUp = () => {
        this.setScrollDisabled(false)
        this.props.close()
    }

    render() {
        const { title, description, actions } = this.props

        return (
            <div className={ styles.popUpWrapper }>
                <div className={ styles.popUpBackground } onClick={ this.closePopUp } />
                <div className={ styles.popUp }>
                    <div className={ styles.popUpHeader }>
                        { title && (
                            <h2 className={ styles.popUpHeaderTitle }>
                                { title }
                            </h2>
                        )}
                        <button className={ styles.popUpHeaderClose } onClick={ this.closePopUp }>
                            <Icon iconName={ 'Times' } />
                        </button>
                    </div>
                    { description && (
                        <p className={ styles.popUpDescription }>
                            { description }
                        </p>
                    )}
                    { actions && (
                        <ul className={ styles.popUpActions }>
                            {this.props.actions.map((action) => {
                                return (
                                    <li className={ styles.popUpActionsAction } key={ action.title }>
                                        <Button icon={ action.icon } value={ action.title } inverted={ !action.primary } onClick={ action.action } />
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
            </div>
        )
    }
}

export default PopUp
