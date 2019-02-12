import React, { Component } from 'react'
import styles from './statistics.scss'
import { Statistic } from '..';

class Statistics extends Component {
  render() {
    return (
      <section className={styles.wrapper}>
        <div className={styles.innerWrapper}>
          <Statistic type={'views'} count={3200000} />
          <Statistic type={'likes'} count={5051} />
          <Statistic type={'posts'} count={29} />
          <Statistic type={'time'} count={1440} />
        </div>
      </section>
    )
  }
}

export default Statistics
