import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'
import * as brands from '@fortawesome/fontawesome-free-brands'
import { library } from '@fortawesome/fontawesome-svg-core'

const Icon = props => {
    const classNames = []
    if (props.className) classNames.push(props.className)

    let icon = icons[`fa${props.iconName}`] || brands[`fa${props.iconName}`] || icons['faBan']
    library.add(icon)

    return <FontAwesomeIcon className={classNames.join(' ')} icon={icon} onClick={props.onClick} />
}

export default Icon
