import React, { Component } from 'react'
import styles from './postBanner.scss'
import { inject, observer } from 'mobx-react'
// import { Icon } from '..';

@inject('store') @observer
class PostBanner extends Component {
  render() {
    const { user } = this.props.store

    let fontSize = ''

    if (user.name.length >= 22) {
      fontSize = styles.nameSmall
    } else if (user.name.length >= 14) {
      fontSize = styles.nameMedium
    } else if (user.name.length >= 8) {
      fontSize = styles.nameLarge
    }

    return (
      <section className={styles.wrapper}>
        <div className={styles.innerWrapper}>
          <div className={styles.postUserinfo}>
            <div className={styles.picture} style={{ backgroundImage: `url(${user.picture})` }}>
            </div>
            <div className={styles.info}>
              <h2 className={[styles.name, fontSize].join(' ')}>{ user.name || ''}</h2>
              <div className={styles.achieved}>
                <span className={styles.level}>{ user.level || ''}</span>
                <h3 className={styles.role}>{ user.role || ''}</h3>
              </div>
            </div>
          </div>
          <div className={styles.background} style={{ backgroundImage: `url(${user.banner})` }} />
        </div>
      </section>
    )
  }
}

export default PostBanner
