import React, { Component } from 'react'
import styles from './loader.scss'
import { Icon } from '../../components'

class Loader extends Component {
  render() {
    return (
      <div className={ styles.wrapper }>
        <div className={ styles.loader }>
          <Icon iconName='Compass' className={ styles.loaderIcon } />
        </div>
      </div>
    )
  }
}

export default Loader
