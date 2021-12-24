import React, { Component } from 'react'
import styles from './subNavigationElement.scss'
import { Icon } from '..'
import { Link } from 'react-router-dom'

class SubNavigationElement extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { title, index, icon, onClick, to } = this.props

    return (
      <Link
        className={ styles.item }
        to={ to || '' }
        onClick={ onClick }
      >
        <li className={ styles.itemHeading } key={ index }>
          <Icon iconName={ icon } className={ styles.icon } />
          {title}
        </li>
      </Link>
    )
  }
}

export default SubNavigationElement
