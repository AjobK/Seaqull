import React, { Component } from 'react'
import styles from './userBanner.scss'
import { inject, observer } from 'mobx-react'
import { Icon } from '..'

@inject('store') @observer
class UserBanner extends Component {
  render() {
    const user = this.props.user

    let fontSize = ''

    if (user.username.length >= 22) {
      fontSize = styles.nameSmall
    } else if (user.username.length >= 14) {
      fontSize = styles.nameMedium
    } else if (user.username.length >= 8) {
      fontSize = styles.nameLarge
    }

    return (
      <section className={styles.wrapper}>
        <div className={styles.innerWrapper}>
          <div className={styles.picture} style={{ backgroundImage: `url(${user.picture})` }}>
            <span className={styles.levelMobile}>{ user.level || ''}</span>
            {user.editable && <span className={styles.pictureEdit}>
              <Icon iconName={'Pen'} />
            </span>}
          </div>
          <div className={styles.info}>
            <h2 className={[styles.name, fontSize].join(' ')}>{ user.username || ''}</h2>
            <div className={styles.achieved}>
              <span className={styles.level}>{ user.level || ''}</span>
              <h3 className={styles.role}>{ user.title || ''}</h3>
            </div>
          </div>
        </div>
        <div className={styles.background} style={{ backgroundImage: `url(${user.banner})` }} />
      </section>
    )
  }
}

export default UserBanner
