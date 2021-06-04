import React, { Component } from 'react'
import {Icon, Loader} from '../../components'
import styles from './postsBlockLarge.scss'

class PostsBlockLarge extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className={styles.large}>
				<div className={styles.largeOverlay}>
					<h3 className={styles.largeOverlayTitle}>The Seaqull Resource Library, with some extra words</h3>
					<div className={styles.largeOverlayDescription}>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
					</div>
					<div className={styles.largeOverlayBottom}>
						<div className={styles.largeOverlayBottomInfo}>
							<a href="#" className={styles.largeOverlayBottomInfoCategory}>
								<span className={styles.largeOverlayBottomInfoCategoryBullet}>
									<Icon iconName={'Circle'} className={styles.largeOverlayBottomInfoCategoryBulletIcon} />
								</span>
								Machine learning
							</a>
							<span className={styles.largeOverlayBottomInfoBullet}>
										&bull;
									</span>
							<div className={styles.largeOverlayBottomInfoText}>
								<span className={styles.largeOverlayBottomInfoTextReadingTime}>
									<Icon iconName={'Stopwatch'} className={styles.largeOverlayBottomInfoTextReadingTimeIcon} />
								</span>
								<p>6 min</p>
							</div>
							<span className={styles.largeOverlayBottomInfoBullet}>
								&bull;
							</span>
							<div className={styles.largeOverlayBottomInfoText}>
								<p>10 minutes ago</p>
							</div>
						</div>
						<span className={styles.largeOverlayBottomBookmark}>
							<Icon iconName={'Bookmark'} className={styles.largeOverlayBottomBookmarkIcon} />
						</span>
					</div>
				</div>
				<img src={'https://preview.redd.it/e6mr16a9ah071.jpg?width=640&crop=smart&auto=webp&s=bf7f4c3e7f590df70fab692ed64040b27691df76'} alt={'post'}/>
			</div>
		)
	}
}

export default PostsBlockLarge
