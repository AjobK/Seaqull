import React, { Component } from 'react'
import {Icon, Loader} from '../../components'
import styles from './postsBlockSmall.scss'

class PostsBlockSmall extends Component {
	render() {
		return (
			<div className={styles.smallPost}>
				<div className={styles.smallPostThumbnail}>
					<div className={styles.smallPostThumbnailOverlay}>
						<a href="#" className={styles.smallPostThumbnailOverlayCategory}>
							<span className={styles.smallPostThumbnailOverlayCategoryBullet}>
									<Icon iconName={'Circle'} className={styles.smallPostThumbnailOverlayCategoryBulletIcon} />
							</span>
							<p>Machine learning</p>
						</a>
						<span className={styles.smallPostThumbnailOverlayBookmark}>
							<Icon iconName={'Bookmark'} className={styles.smallPostThumbnailOverlayBookmarkIcon} />
						</span>
					</div>
					<img src={'https://preview.redd.it/e6mr16a9ah071.jpg?width=640&crop=smart&auto=webp&s=bf7f4c3e7f590df70fab692ed64040b27691df76'} alt={'post'}/>
				</div>
				<div className={styles.smallPostContent}>
					<h4 className={styles.smallPostContentTitle}>The Seaqull Resource Library, with some extra words</h4>
					<p className={styles.smallPostContentDescription}>
						Lorem ipsum dolor sit amet, consectetur adipiscing
						elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam,
					</p>
					<div className={styles.smallPostContentBottom}>
						<div className={styles.smallPostContentBottomInfo}>
							<div className={styles.smallPostContentBottomInfoText}>
								<span className={styles.smallPostContentBottomInfoTextReadingTime}>
									<Icon iconName={'Stopwatch'} className={styles.smallPostContentBottomInfoTextReadingTimeIcon} />
								</span>
								<p>6 min</p>
							</div>
							<span className={styles.smallPostContentBottomInfoBullet}>
								&bull;
							</span>
							<div className={styles.smallPostContentBottomInfoText}>
								<p>10 minutes ago</p>
							</div>
						</div>
						<a href={'#'} className={styles.smallPostContentBottomButton}>
							<Icon iconName={'ChevronRight'} className={styles.smallPostContentBottomButtonIcon} />
						</a>
					</div>
				</div>
			</div>
		)
	}
}

export default PostsBlockSmall
