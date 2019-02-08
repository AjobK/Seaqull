import React, { Component } from 'react'
import styles from './statistics.scss'
import StatisticImage from '../../static/statistic.svg'
import { Icon } from '..';

class Statistic extends Component {
  render() {
    const { type, count } = this.props

    const types = {
      'views': {
        color: '#66c1ff',
        icon: 'Eye'
      },
      'likes': {
        color: '#ff6666',
        icon: 'FeatherAlt'
      },
      'posts': {
        color: '#ffda66',
        icon: 'Pen'
      },
      'time': {
        color: '#66ff86',
        icon: 'Clock'
      }
    }

    let thisType = { // Default
      color: '#ff4040',
      icon: ''
    }

    if (types[type])
      thisType = types[type]

    return (
      <div className={styles.statistic}>
        <div className={styles.statisticWrapper}>
          <img draggable={false} className={styles.statisticImage} src={StatisticImage} />
          <div className={styles.statisticContent}>
            <p className={styles.statisticCounter}>{count || 0}</p>
            <Icon iconName={thisType['icon'] || ''} className={styles.statisticIcon} style={{ color: thisType['color'] }}/>
          </div>
        </div>
        <p className={styles.statisticType}>{type || 'NONE'}</p>
      </div>
    )
  }
}

export default Statistic
