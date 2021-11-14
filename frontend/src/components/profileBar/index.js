import React, { Component } from 'react'
import styles from './profilebar.scss'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { ColorUtil } from '../../util/'

@inject('store')
@observer
class ProfileBar extends Component {
  render() {
    const { avatar, name, title } = this.props

    return (
      <section className={ styles.profile } style={ { backgroundColor: ColorUtil.getUniqueColorBasedOnString(name) } }>
        <Link to={ '/profile' }>
          <div className={ styles.profilePicture } style={ { backgroundImage: `url('${avatar}')` } }></div>
        </Link>
        <div className={ styles.profileInfo }>
          <div className={ styles.profileInfoWrapper }>
            <h2 className={ styles.profileInfoUserName }>{name || 'Username'}</h2>
            <p className={ styles.profileInfoUserRole }>{title || 'Developer'}</p>
          </div>
        </div>
      </section>
    )
  }
}

export default ProfileBar
