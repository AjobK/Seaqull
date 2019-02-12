import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import styles from './logo.scss'
import LogoSvg from '../../static/commercial/logo.svg'

@inject('store') @observer
class Button extends Component {
  render() {
    const { onlyIcon, className } = this.props
    const { defaultData } = this.props.store

    return (
      <Link to={'/'} className={[styles.logo, ...className || ''].join(' ')}>
        <img className={styles.logoImage} src={LogoSvg} draggable={false} />
        {!onlyIcon && <h1 className={styles.logoText}>{defaultData.projectName}</h1>}
      </Link>
    )
  }
}

export default Button
