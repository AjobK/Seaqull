import React, { Component } from 'react'
import { Loader } from '../../components'
import styles from './postsBlock.scss'

class PostsBlock extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className={styles.postsBlockWrapper}>
				<div className={`${styles.postsBlock} ${styles.LRR}`}>
					<div className={`${styles.postsBlockPost} ${styles.large}`}>
						<div className={styles.largeOverlay}>
							<h3 className={styles.largeOverlayTitle}>The Seaqull Resource Library, with some extra words</h3>
							<div className={styles.largeOverlayBottom}>
								<div className={styles.largeOverlayBottomInfo}>
									<a href="#" className={styles.largeOverlayBottomInfoCategory}>
										<span className={styles.largeOverlayBottomInfoCategoryBullet}>&bull;</span>
										Machine learning
									</a>
									<span className={styles.largeOverlayBottomInfoBullet}>
										&bull;
									</span>
									<div className={styles.largeOverlayBottomInfoText}>
										<p>6 min</p>
									</div>
									<span className={styles.largeOverlayBottomInfoBullet}>
										&bull;
									</span>
									<div className={styles.largeOverlayBottomInfoText}>
										<p>10 minutes ago</p>
									</div>
								</div>
							</div>
						</div>
						<img src={'https://preview.redd.it/e6mr16a9ah071.jpg?width=640&crop=smart&auto=webp&s=bf7f4c3e7f590df70fab692ed64040b27691df76'} alt={'post'}/>
					</div>
					<div className={`${styles.postsBlockPost} ${styles.small}`}>
						<div className={styles.smallPost}>
							<div className={styles.smallPostThumbnail}>
								<div className={styles.smallPostThumbnailOverlay}>
									<a href="#" className={styles.smallPostThumbnailOverlayCategory}>
										<span className={styles.smallPostThumbnailOverlayCategoryBullet}>&bull;</span>
										Machine learning
									</a>
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
										&gt;
									</a>
								</div>
							</div>
						</div>
						<div className={styles.smallPost}>
							<div className={styles.smallPostThumbnail}>
								<div className={styles.smallPostThumbnailOverlay}>
									<a href="#" className={styles.smallPostThumbnailOverlayCategory}>
										<span className={styles.smallPostThumbnailOverlayCategoryBullet}>&bull;</span>
										Machine learning
									</a>
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
										&gt;
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default PostsBlock
