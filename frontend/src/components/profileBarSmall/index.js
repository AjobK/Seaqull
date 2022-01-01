import React, { Component } from 'react'
import styles from './profileBarSmall.scss'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { ColorUtil } from '../../util/'
import { Icon } from '../index'

@inject('store')
@observer
class ProfileBarSmall extends Component {
  render() {
    const { author } = this.props

    return (
      <Link to={ `/profile/${ author.name }` } className={ styles.profileBarSmall }>
        <div
          className={ styles.profileBarSmallImage }
          style={ {
            backgroundImage: `url(${ author.avatarURL || '' })`,
            backgroundColor: ColorUtil.getUniqueColorBasedOnString(author.name)
          } }
        />
        <div className={ styles.profileBarSmallContent }>
          <Icon className={ styles.profileBarSmallContentBadge } iconName={ 'At' }/>
          <h2 className={ styles.profileBarSmallContentUsername }>{ author.name || 'Username' }</h2>
        </div>
      </Link>
    )
  }
}

export default ProfileBarSmall
