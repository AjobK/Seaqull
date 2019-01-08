import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brands from '@fortawesome/fontawesome-free-brands'
import { library } from '@fortawesome/fontawesome-svg-core'

const Icon = props => {
  // config.autoAddCss = false
  let icon
  const classNames = []
  if (props.className) {
    classNames.push(props.className)
  }
  try {
    icon = icons[props.iconName] || brands[props.iconName]
    library.add(icon)
  } catch (error) {
    icon = icons['faBan']
    library.add(icon)
    console.error(`Icon name '${props.iconName}' not found. ${error}`)
  }
  return <FontAwesomeIcon className={classNames.join(' ')} icon={icon} onClick={props.onClick} />
}

export default Icon