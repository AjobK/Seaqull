import React, { Component } from 'react'
import styles from './postBanner.scss'
import { inject, observer } from 'mobx-react'
import { Icon } from '..';
import { Link } from 'react-router-dom';

@inject('store') @observer
class PostBanner extends Component {
  render() {
    const { post } = this.props.store

    return (
      <section className={styles.wrapper}>
        {post.loggedIn && <span className={styles.wrapperEdit}>
          Click to edit &nbsp; <Icon iconName={'Pen'} />
        </span>}
        <div className={styles.backdrop}/>
        <div className={styles.innerWrapper}>
          <Link to='/profile' className={styles.info}>
            <div className={styles.picture} style={{ backgroundImage: `url(${post.picture})` }} />
            <div className={styles.user_info}>
              <h2 className={[styles.name].join(' ')}>{ post.name || ''}</h2>
              <div className={styles.achieved}>
                <span className={styles.level}>{ post.level || ''}</span>
                <h3 className={styles.role}>{ post.role || ''}</h3>
              </div>
            </div>
          </Link>
        </div>
        <div className={styles.background} style={{ backgroundImage: `url(${post.banner})` }} />
      </section>
    )
  }
}

export default PostBanner
