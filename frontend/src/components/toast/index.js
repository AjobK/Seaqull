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

  getToastInput = (toast) => {
    const toastInput = JSON.parse(toast.message)

    if (!toastInput.type)
      toastInput.type = toastData.types.info.type

    return toastInput
  }

  render() {
    return (
      <Toaster
        position='bottom-center'
        reverseOrder={ false }
      >
        { (t) =>
          <ToastBar
            toast={ t }
            position='bottom-center'
          >
            { () => {
              const toastInput = this.getToastInput(t)
              const toastTypeStyles = this.getToastTypeStyles(toastInput.type)

              return (
                <div
                  className={ `${ styles.toast } ${ toastTypeStyles }` }
                  style={ { opacity: t.visible ? 1 : 0 } }
                  onClick={ () => toast.dismiss(t.id) }
                >
                  { resolveValue(
                    <>
                      <div className={ styles.toastHeader }>
                        <p className={ styles.toastIcon }>
                          <Icon iconName={ toastInput.icon } />
                        </p>
                        <p className={ `${ styles.toastText } ${ styles.toastTitle }` }>
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
