import React, { Component } from 'react'
import styles from './postsBlockLargeInfo.scss'
import {Icon} from "../index";

class PostsBlockLargeInfo extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className={styles.postsBlockLargeInfo}>

					<a href="#" className={styles.postsBlockLargeInfoCategory}>
						<span className={styles.postsBlockLargeInfoCategoryBullet}>
							<Icon iconName={'Circle'} className={styles.postsBlockLargeInfoCategoryBulletIcon} />
						</span>
						Machine learning
					</a>
					<span className={styles.postsBlockLargeInfoBullet}>
						&bull;
					</span>
					<div className={styles.postsBlockLargeInfoText}>
						<span className={styles.postsBlockLargeInfoTextReadingTime}>
							<Icon iconName={'Stopwatch'} className={styles.postsBlockLargeInfoTextReadingTimeIcon} />
						</span>
						<p>6 min</p>
					</div>
					<span className={styles.postsBlockLargeInfoBullet}>
						&bull;
					</span>
					<div className={styles.postsBlockLargeInfoText}>
						<p>10 minutes ago</p>
					</div>
			</div>
		)
	}
}

export default PostsBlockLargeInfo
