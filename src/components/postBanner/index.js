import React, { Component } from 'react'
import styles from './postBanner.scss'
import { inject, observer } from 'mobx-react'
import { Icon } from '..';
import { Link } from 'react-router-dom';

@inject('store') @observer
class PostBanner extends Component {
  render() {
    const { user } = this.props.store

    return (
      <section className={styles.wrapper}>
        {user.loggedIn && <span className={styles.wrapperEdit}>
          <Icon iconName={'Pen'} />
        </span>}
        <div className={styles.innerWrapper}>
          <Link to='/profile' className={styles.info}>
            <div className={styles.picture} style={{ backgroundImage: `url(${user.picture})` }}>
              <span className={styles.levelMobile}>{ user.level || ''}</span>
            </div>
            <div className={styles.user_info}>
              <h2 className={[styles.name].join(' ')}>{ user.name || ''}</h2>
              <div className={styles.achieved}>
                <span className={styles.level}>{ user.level || ''}</span>
                <h3 className={styles.role}>{ user.role || ''}</h3>
              </div>
            </div>
          </Link>
        </div>
        <div className={styles.background} style={{ backgroundImage: `url(${user.banner})` }} />
      </section>
    )
  }
}

export default PostBanner
