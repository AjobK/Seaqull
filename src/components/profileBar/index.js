import React, { Component } from 'react'
import styles from './profilebar.scss'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

@inject('store') @observer
class ProfileBar extends Component {
  render() {
    const { name, role, picture, level, percentage } = this.props.store.user

    return (
      <section className={styles.profile}>
        <Link to={'/profile'}>
          <div className={styles.profilePicture} style={{ backgroundImage: `url('${picture}')` }}>
            <div className={styles.profileLevel}>
              <div className={styles.profileLevelNumber}>{level || Math.floor(Math.random() * 100)}</div>
            </div>
          </div>
        </Link>
        <div className={styles.profileInfo}>
          <div className={styles.profileInfoWrapper}>
            <h2 className={styles.profileInfoUserName}>{name || 'Username'}</h2>
            <p className={styles.profileInfoUserRole}>{role || 'Developer'}</p>
          </div>
          <div className={styles.level}>
            <div className={styles.levelProgress} style={{ width: (percentage && `${percentage}%` || '50%') }} />
          </div>
        </div>
      </section>
    )
  }
}

export default ProfileBar
