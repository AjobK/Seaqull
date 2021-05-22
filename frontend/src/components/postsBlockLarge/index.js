import React, { Component } from 'react'
import { Loader } from '../../components'
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
		)
	}
}

export default PostsBlockLarge
