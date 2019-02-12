import React, { Component } from 'react'
import styles from './statistics.scss'
import StatisticImage from '../../static/statistic.svg'
import { Icon } from '..';

class Statistic extends Component {
  /**
  * @param {number} input
  */
  numberFormat(input) {
    if (+input >= 999999)
      return (Math.round(+input / 1e5) / 10) + 'M'
    else if (+input >= 999)
      return (Math.round(+input / 1e2) / 10) + 'K'
    else
      return +input
  }

  /**
  * @param {number} input
  */
  timeFormat(input) {
    let hour = 60
    let day = 60 * 24

    let passed = {
      minutes: 0,
      hours: 0,
      days: 0
    }

    let timeFormat = []

    passed.days = Math.floor(input / day)

    if (passed.days > 0) {
      timeFormat.push(passed.days + 'D')
      input -= passed.days * day
    }

    passed.hours = Math.floor(input / hour)

    if (passed.hours > 0) {
      timeFormat.push(passed.hours + 'H')
    }

    input -= passed.hours * hour
    passed.minutes = input

    if (passed.minutes > 0 && timeFormat.length < 2) {
      timeFormat.push(passed.minutes + 'M')
    }

    return timeFormat.join(' ')

  }

  render() {
    const { type, count } = this.props

    const types = {
      'views': {
        color: '#66c1ff',
        icon: 'Eye',
        func: this.numberFormat
      },
      'likes': {
        color: '#ff6666',
        icon: 'FeatherAlt',
        func: this.numberFormat
      },
      'posts': {
        color: '#ffda66',
        icon: 'Pen',
        func: this.numberFormat
      },
      'time': {
        color: '#66ff86',
        icon: 'Clock',
        func: this.timeFormat
      }
    }

    let thisType = { // Default
      color: '#ff4040',
      icon: '',
      func: this.numberFormat
    }

    if (types[type])
      thisType = types[type]

    return (
      <div className={styles.statistic}>
        <div className={styles.statisticWrapper}>
          <img draggable={false} className={styles.statisticImage} src={StatisticImage} />
          <div className={styles.statisticContent}>
            <p className={styles.statisticCounter}>{thisType.func(count) || 0}</p>
            <Icon iconName={thisType['icon'] || ''} className={styles.statisticIcon} style={{ color: thisType['color'] }}/>
          </div>
        </div>
        <p className={styles.statisticType}>{type || 'NONE'}</p>
      </div>
    )
  }
}

export default Statistic
