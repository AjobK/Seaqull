import React, { Component } from 'react'
import styles from './postBanner.scss'
import { inject, observer } from 'mobx-react'
import { Icon } from '..';
import { Link } from 'react-router-dom';

@inject('store') @observer
class PostBanner extends Component {
  render() {
    const { post, user } = this.props.store

    return (
      <section className={`${styles.wrapper} ${user.loggedIn ? styles.owner : ''}`}>
        <div className={styles.background} style={{ backgroundImage: `url(${post.banner})` }} />
        {user.loggedIn &&
          <div className={styles.wrapperEditContainer}>
            <span className={styles.wrapperEdit}>
              <span className={styles.wrapperEditContent}>Click to edit</span> <Icon iconName={'Pen'} />
            </span>
          </div>
        }
        <div className={styles.backdrop}/>
        <div className={styles.innerWrapper}>
          <div className={styles.info}>
            <Link to='/profile' className={styles.profileLink}>
              <div className={styles.infoInner}>
                <div className={styles.picture} style={{ backgroundImage: `url(${post.picture})` }} />
                <div className={styles.user_info}>
                  <h2 className={[styles.name].join(' ')}>{ post.name || ''}</h2>
                  <div className={styles.achieved}>
                    <span className={styles.level}>{ post.level || ''}</span>
                    <h3 className={styles.role}>{ post.role || ''}</h3>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    )
  }
}

export default PostBanner
