import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styles from './popUp.scss'
import { Button } from '../index'

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
        const { title, description, actions, close } = this.props

        return (
            <div className={ styles.popUpWrapper }>
                <div className={ styles.popUpBackground } onClick={ close } />
                <div className={ styles.popUp }>
                    { title && (
                        <h2 className={ styles.popUpTitle }>
                            { title }
                        </h2>
                    )}
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
                                        <Button value={ action.title } inverted={ !action.primary } onClick={ action.action } />
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                    {/*{ this.props.children }*/}
                </div>
            </div>
        )
    }
}

export default PopUp
