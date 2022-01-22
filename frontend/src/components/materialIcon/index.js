import React, { Component } from 'react'
import * as icons from '@mui/icons-material'

class MaterialIcon extends Component {
  render() {
    const { iconName } = this.props
    console.log(iconName)
    const Icon = icons[iconName]

    return (
      <>
        <Icon />
      </>
    )
  }
}

export default MaterialIcon
