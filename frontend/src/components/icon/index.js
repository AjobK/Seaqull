import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brands from '@fortawesome/fontawesome-free-brands'
import { library } from '@fortawesome/fontawesome-svg-core'
import { MaterialIcon } from '../../components'

class Icon extends Component {
  render() {
    let classNames = []
    const { className, iconName, onClick, onMouseDown, onMouseUp, style } = this.props
    let { prefix } = this.props

    prefix = prefix || 'fa'

    if (typeof className == 'string')
      classNames.push(className)
    else if (className)
      classNames = [...className]

    let icon = icons[`${prefix}${iconName}`] || brands[`${prefix}${iconName}`] || icons['faBan']

    library.add(icon)

    return (
      <>
        { prefix === 'mui'
          ? <MaterialIcon iconName={ iconName } />
          : <FontAwesomeIcon
            className={ classNames.join(' ') }
            icon={ icon } onClick={ onClick }
            onMouseDown={ onMouseDown }
            onMouseUp={ onMouseUp }
            style={ style }
          />
        }
      </>
    )
  }
}

export default Icon
