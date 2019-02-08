import React, { Component } from 'react'
import styles from './statistics.scss'
import { Statistic } from '..';

class Statistics extends Component {
  render() {
    return (
      <section className={styles.wrapper}>
        <div className={styles.innerWrapper}>
          <Statistic type={'views'} count={'3,2K'} />
          <Statistic type={'likes'} count={'386'}/>
          <Statistic type={'posts'} count={'7'}/>
          <Statistic type={'time'} count={'8H'}/>
        </div>
      </section>
    )
  }
}

export default Statistics
