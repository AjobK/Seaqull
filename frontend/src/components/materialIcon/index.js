import React, { Component } from 'react'
import * as icons from '@mui/icons-material'

class MaterialIcon extends Component {
  render() {
    const { className, iconName, onMouseDown, onMouseUp, style } = this.props
    console.log(iconName)
    const Icon = icons[iconName]

    return (
      <Icon
        className={ className }
        onMouseDown={ onMouseDown }
        onMouseUp={ onMouseUp }
        style={ style }
      />
    )
  }
}

export default MaterialIcon
