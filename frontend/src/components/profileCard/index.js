import React, { Component } from 'react'
import styles from './profileCard.scss'
import { Icon } from '../'

class ProfileCard extends Component {

  render() {
    const user = this.props.user

    return (
      <section className={ styles.wrapper }>
        <div className={ styles.profilePictureWrapper }>
          <div className={ styles.profilePicture } style={ { backgroundImage: `url(${ user.picture })` } }></div>
        </div>
        <div className={ styles.profileInfo }>
          <div className={ styles.profileNameWrapper }>
            <Icon className={ styles.profileInfoBadge } iconName={ 'At' }/>
            <h2 className={ styles.profileInfoUsername }>{ user.username || 'Username' }</h2>
          </div>
        </div>
      </section>
    )
  }
}

export default ProfileCard
