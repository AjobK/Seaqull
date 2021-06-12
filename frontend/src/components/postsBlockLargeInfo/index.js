import React, { Component } from 'react'
import styles from './postsBlockLargeInfo.scss'
import {Icon} from "../index";

class PostsBlockLargeInfo extends Component {
	render() {
		return (
			<div className={styles.postsBlockLargeInfo}>
				<div className={styles.postsBlockLargeInfoLeft}>
					<a href="#" className={styles.postsBlockLargeInfoLeftCategory}>
						<span className={styles.postsBlockLargeInfoLeftCategoryBullet}>
							<Icon iconName={'Circle'} className={styles.postsBlockLargeInfoLeftCategoryBulletIcon} />
						</span>
						Machine learning
					</a>
					<span className={styles.postsBlockLargeInfoLeftBullet}>
						&bull;
					</span>
					<div className={styles.postsBlockLargeInfoLeftText}>
						<span className={styles.postsBlockLargeInfoLeftTextReadingTime}>
							<Icon iconName={'Stopwatch'} className={styles.postsBlockLargeInfoLeftTextReadingTimeIcon} />
						</span>
						<p>6 min</p>
					</div>
					<span className={styles.postsBlockLargeInfoLeftBullet}>
						&bull;
					</span>
					<div className={styles.postsBlockLargeInfoLeftText}>
						<p>10 minutes ago</p>
					</div>
				</div>
				<span className={styles.postsBlockLargeInfoBookmark}>
					<Icon iconName={'Bookmark'} className={styles.postsBlockLargeInfoLeftBookmarkIcon} />
				</span>
			</div>
		)
	}
}

export default PostsBlockLargeInfo
