import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { resolveValue, Toaster } from 'react-hot-toast'
import styles from './toast.scss'

@inject('store')
@observer
class Toast extends Component {
  constructor(props) {
    super(props)
  }

  getToastColors = (toastType) => {
    switch (toastType) {
      case 'success':
        return styles.toastSuccess
      case 'error':
        return styles.toastError
      case 'loading':
        return styles.toastWarning
      default:
        return styles.toastGeneral
    }
  }

  render() {
    return (
      <Toaster
        position='bottom-right'
        reverseOrder={ false }
        toastOptions={ {
          duration: 5000
        } }
      >
        { (toast) => {
          const message = JSON.parse(toast.message)
          const colors = this.getToastColors(toast.type)

          return (
            <div
              className={ [styles.toast, colors].join(' ') }
              style={ {
                opacity: toast.visible ? 1 : 0,
              } }
            >
              { resolveValue(
                <>
                  <p className={ [styles.toastText, styles.toastTitle].join(' ') }>
                    { message.title }
                  </p>
                  <p className={ styles.toastText }>
                    { message.content }
                  </p>
                </>, toast)
              }
            </div>
          )}}
      </Toaster>
    )
  }
}

export default Toast
