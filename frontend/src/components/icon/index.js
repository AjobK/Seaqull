import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as muiIcons from '@mui/icons-material'
import * as brands from '@fortawesome/fontawesome-free-brands'
import { library } from '@fortawesome/fontawesome-svg-core'
import { SvgIcon } from '@mui/material'

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

    let icon = icons[`${ prefix }${ iconName }`] || brands[`${ prefix }${ iconName }`] || icons['faBan']

    library.add(icon)

    const materialIcon = muiIcons[iconName]

    const renderSwitch = () => {
      switch (prefix) {
        case 'mui':
          return <SvgIcon
            className={ classNames.join(' ') }
            component={ materialIcon }
            onMouseDown={ onMouseDown }
            onMouseUp={ onMouseUp }
            style={ style }
          />
        default:
          return <FontAwesomeIcon
            className={ classNames.join(' ') }
            icon={ icon } onClick={ onClick }
            onMouseDown={ onMouseDown }
            onMouseUp={ onMouseUp }
            style={ style }
          />
      }
    }

    return (
      <>
        { renderSwitch() }
      </>
    )
  }
}

export default Icon
