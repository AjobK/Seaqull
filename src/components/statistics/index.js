import React, { Component } from 'react'
import styles from './statistics.scss'
import StatisticImage from '../../static/statistic.svg'

class Statistics extends Component {
  render() {
    return (
      <section className={styles.wrapper}>
        <div className={styles.innerWrapper}>
          <img draggable={false} className={styles.statistic} src={StatisticImage} />
          <img draggable={false} className={styles.statistic} src={StatisticImage} />
          <img draggable={false} className={styles.statistic} src={StatisticImage} />
          <img draggable={false} className={styles.statistic} src={StatisticImage} />
        </div>
      </section>
    )
  }
}

export default Statistics
