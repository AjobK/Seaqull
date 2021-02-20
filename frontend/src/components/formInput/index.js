import React, { Component } from 'react'
import styles from './formInput.scss'
import { Icon } from '../../components'
import ReactTooltip from 'react-tooltip'

class FormInput extends Component {
  constructor(props) {
    super(props)
    const { name, callBack } = this.props

    this.elId = []
    this.id = this.getElId(name)
    this.toolTipId = this.getElId(`${name}ToolTip`)

    this.state = {
      passwordVisible: false
    }

    callBack(this, this.id)
  }

  // Unique keys to avoid botting
  getElId = (param) => {
    if (!this.elId[param]) {
      this.elId[param] = param + '-' + (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      )
    }

    return this.elId[param]
  }

  getErrorMessages = () => {
    const { toolTipId } = this
    const { errors } = this.props

    return (
      <ReactTooltip id={toolTipId} effect={'solid'} place={'right'} className={styles.toolTip}>
        <ul className={styles.toolTipUl}>
          {(errors != 'loading') && errors.map((message, i) => <li key={i} className={styles.toolTipLi}>{message}</li>)}
        </ul>
      </ReactTooltip>
    )
  }

  togglePasswordVisible = () => {
    const { passwordVisible } = this.state

    this.setState({ passwordVisible: !passwordVisible })
  }

  render() {
    const { name, className, errors, password } = this.props
    const { id, toolTipId } = this
    const { passwordVisible } = this.state
    const hasErrors = errors != 'loading' && errors && errors.length > 0,
          iconClassName = ((errors == null || errors == 'loading') && 'noClass') || (errors.length <= 0 ? styles.iconCheck : styles.iconTimes),
          iconName = (errors == null && 'MinusCircle') || (errors == 'loading' && 'Cog') || (errors.length <= 0 ? 'CheckCircle' : 'TimesCircle'),
          inputType = password && !passwordVisible ? 'password' : 'text',
          loadingClass = errors == 'loading' ? 'fa-spin' : '',
          isPassword = password

    return (
      <div className={[...className || ''].join(' ')}>
        <label htmlFor={id} className={styles.label}>
          <Icon
            className={`${styles.icon} ${iconClassName} ${loadingClass}`}
            iconName={iconName}
          />
          <span>{name}</span>
        </label>
        <div className={styles.inputWrapper}>
          <input id={id} className={styles.input} type={inputType} data-tip data-for={toolTipId} data-event='focus' data-event-off='blur' autoComplete={''} />
          { isPassword && <Icon className={`${styles.icon} ${styles.iconPassword}`} iconName={'Eye'} onClick={this.togglePasswordVisible} />}
          {(hasErrors && this.getErrorMessages())}
        </div>
      </div>
    )
  }
}
export default FormInput
