import React, { Component } from 'react'
import styles from './profileInfo.scss'
import { inject, observer } from 'mobx-react'

@inject('store') @observer
class ProfileInfo extends Component {
  render() {
    const { user, posts } = this.props

    const followersStatisticClass = user.followerCount > 0 ? styles.clickableFollowers : ''

    return (
      <div className={ `${ styles.profileStatistics }` }>
        <div
          className={ `${ styles.profileStatistic } ${ followersStatisticClass }` }
          onClick={ this.props.openFollowersList }>
          <p className={ styles.profileStatisticNumber }>{ user.followerCount }</p>
          <p className={ styles.profileStatisticMetric }>Followers</p>
        </div>
        <div className={ styles.profileStatistic }>
          <p className={ styles.profileStatisticNumber }>{ user.followingCount }</p>
          <p className={ styles.profileStatisticMetric }>Following</p>
        </div>
        <div className={ styles.profileStatistic }>
          <p className={ styles.profileStatisticNumber }>
            { posts.length }
          </p>
          <p className={ styles.profileStatisticMetric }>Posts</p>
        </div>
      </div>
    )
  }
}

export default ProfileInfo
