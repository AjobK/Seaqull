import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { resolveValue, Toaster, ToastBar, toast } from 'react-hot-toast'
import styles from './toast.scss'
import { Icon } from '../index'
import { toastData } from './toastData'

@inject('store')
@observer
class Toast extends Component {
  constructor(props) {
    super(props)
  }

  getToastTypeStyles = (toastType) => {
    return styles[`toast${ toastType.charAt(0).toUpperCase() + toastType.slice(1) }`]
  }

  getToastTypeIcon = (toastType) => {
    return (<Icon iconName={ toastData.types[toastType].icon } />)
  }

  getToastInput = (toast) => {
    const toastInput = JSON.parse(toast.message)

    if (!toastInput.type)
      toastInput.type = toastData.types.general.name

    return toastInput
  }

  render() {
    return (
      <Toaster
        position='bottom-right'
        reverseOrder={ false }
        toastOptions={ { className: styles.toastRoot } }
      >
        { (t) =>
          <ToastBar toast={ t }>
            { () => {
              const toastInput = this.getToastInput(t)
              const toastTypeStyles = this.getToastTypeStyles(toastInput.type)

              return (
                <div
                  className={ [styles.toast, toastTypeStyles].join(' ') }
                  style={ { opacity: t.visible ? 1 : 0, } }
                  onClick={ () => toast.dismiss(t.id) }
                >
                  { resolveValue(
                    <>
                      <div className={ styles.toastHeader }>
                        <p className={ styles.toastIcon }>
                          { this.getToastTypeIcon(toastInput.type) }
                        </p>
                        <p className={ [styles.toastText, styles.toastTitle].join(' ') }>
                          { toastInput.title }
                        </p>
                      </div>
                      <p className={ styles.toastText }>
                        { toastInput.description }
                      </p>
                    </>, t)
                  }
                </div>
              )
            } }
          </ToastBar>
        }
      </Toaster>
    )
  }
}

export default Toast
