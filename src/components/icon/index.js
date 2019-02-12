import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brands from '@fortawesome/fontawesome-free-brands'
import { library } from '@fortawesome/fontawesome-svg-core'

class Icon extends Component {
  render() {
    const classNames = []
    const { className, iconName, onClick, style } = this.props

    if (className) classNames.push(className)

    let icon = icons[`fa${iconName}`] || brands[`fa${iconName}`] || icons['faBan']

    library.add(icon)

    return <FontAwesomeIcon className={classNames.join(' ')} icon={icon} onClick={onClick} style={style} />
  }
}

export default Icon
