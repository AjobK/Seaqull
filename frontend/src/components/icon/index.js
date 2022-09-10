import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brands from '@fortawesome/fontawesome-free-brands'
import * as muiIcons from '@mui/icons-material'
import { library } from '@fortawesome/fontawesome-svg-core'
import { SvgIcon } from '@mui/material'
import IconCustom from '../iconCustom'

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

    let combinedIconName = `${ prefix }${ iconName }`
    let icon = icons[combinedIconName ] || brands[combinedIconName] || icons['faBan']

    library.add(icon)

    const materialIcon = muiIcons[iconName]

    const renderIconByPrefix = () => {
      switch (prefix) {
        case 'mui':
          return <SvgIcon
            className={ classNames.join(' ') }
            component={ materialIcon }
            onMouseDown={ onMouseDown }
            onClick={ onClick }
            onMouseUp={ onMouseUp }
            style={ style }
          />
        case 'custom':
          return <IconCustom
            className={ classNames.join(' ') }
            iconName={ iconName }
            onMouseDown={ onMouseDown }
            onMouseUp={ onMouseUp }
            onClick={ onClick }
            style={ style }
          />
        default:
          return <FontAwesomeIcon
            className={ classNames.join(' ') }
            icon={ icon }
            onClick={ onClick }
            onMouseDown={ onMouseDown }
            onMouseUp={ onMouseUp }
            style={ style }
          />
      }
    }

    return (
      <>
        { renderIconByPrefix() }
      </>
    )
  }
}

export default Icon
