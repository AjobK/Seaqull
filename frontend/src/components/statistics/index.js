import React, { Component } from 'react'
import styles from './statistics.scss'
import { Statistic } from '..'

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      views: this.props.statisticsData.views,
      likes: this.props.statisticsData.likes,
      posts: this.props.statisticsData.posts,
    }
  }

  render() {
    const { views, likes, posts } = this.state
    return (
      <section className={styles.wrapper}>
        <div className={styles.innerWrapper}>
          <Statistic type={'views'} count={views} />
          <Statistic type={'likes'} count={likes} />
          <Statistic type={'posts'} count={posts} />
          <Statistic type={'time'} count={0} />
        </div>
      </section>
    )
  }
}

export default Statistics
