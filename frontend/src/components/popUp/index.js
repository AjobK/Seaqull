import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styles from './popUp.scss'
import { Button, Icon } from '../index'

@inject('store') @observer
class PopUp extends Component {
  constructor(props) {
    super(props)

    this.setScrollDisabled(true)
  }

  setScrollDisabled = (scrollDisabled) => {
    document.body.style.overflow = scrollDisabled ? 'hidden' : 'unset'
  }

  closePopUp = () => {
    this.setScrollDisabled(false)

    this.props.content.close()
  }

  render() {
    const { title, description, titleIcon, actions, canCloseWithClick } = this.props.content

    return (
      <div className={ styles.popUpWrapper }>
        <div className={ styles.popUpBackground } onClick={ canCloseWithClick ? this.closePopUp : undefined } />
        <div className={ styles.popUp }>
          <div className={ styles.popUpHeader }>
            { title && (
              <h2 className={ styles.popUpHeaderTitle }>
                { titleIcon && (
                  <Icon className={ styles.popUpHeaderTitleIcon } iconName={ titleIcon } />
                )}
                { title }
              </h2>
            )}
            { }
            { canCloseWithClick &&
              <button className={ styles.popUpHeaderClose } onClick={ this.closePopUp }>
                <Icon iconName={ 'Times' } />
              </button>
            }
          </div>
          { description && (
            <p className={ styles.popUpDescription }>
              { description }
            </p>
          )}
          { actions && (
            <ul className={ styles.popUpActions }>
              { actions.map((action) => {
                return (
                  <li className={ styles.popUpActionsAction } key={ Math.random() }>
                    <Button
                      icon={ action.icon }
                      value={ action.title }
                      inverted={ !action.primary }
                      onClick={ action.action } />
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
