import React, { Component } from 'react'
import styles from './postBanner.scss'
import { inject, observer } from 'mobx-react'
import { Icon } from '..';
import { Link } from 'react-router-dom';

@inject('store') @observer
class PostBanner extends Component {
  render() {
    const { author, isOwner } = this.props

    return (
      <section className={`${styles.wrapper} ${isOwner ? styles.owner : ''}`}>
        <div className={styles.background} style={{ backgroundImage: `url(${author.bannerURL || ''})` }} />
        {this.props.isOwner &&
          <div className={styles.wrapperEditContainer}>
            <span className={styles.wrapperEdit}>
              <span className={styles.wrapperEditContent}>Click to edit</span> <Icon iconName={'Pen'} />
            </span>
          </div>
        }
        <div className={styles.backdrop}/>
        <div className={styles.innerWrapper}>
          <div className={styles.info}>
            <Link to={`/profile/${author.name}`} className={styles.profileLink}>
              <div className={styles.infoInner}>
                <div className={styles.picture} style={{ backgroundImage: `url(${author.avatarURL || ''})` }} />
                <div className={styles.user_info}>
                  <h2 className={[styles.name].join(' ')}>{ author.name || ''}</h2>
                  <div className={styles.achieved}>
                    <span className={styles.level}>{ Number.isSafeInteger(author.level) ? author.level : '-1'}</span>
                    <h3 className={styles.role}>{ author.title || ''}</h3>
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
