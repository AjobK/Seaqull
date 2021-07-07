import React, { Component } from 'react'
import { Icon } from '../../components'
import styles from './postsBlockLarge.scss'

class PostsBlockLarge extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { post } = this.props

		return (
			<div className={ styles.large }>
				<div className={ styles.largeThumbnail }>
					<a href={ '#' } className={ styles.largeBookmarkHover }>
						<Icon iconName={ 'Bookmark' } className={ styles.largeBookmarkIcon } />
					</a>
					<div className={ styles.largeThumbnailContent }>
						<a href={ `posts/${ post.path }` }>
							<h3 className={ styles.largeThumbnailContentTitle }>
								{ post.title }
							</h3>
							<div className={ styles.largeThumbnailContentDesktop }>
								<div className={ `${styles.largeDescription} ${styles.largeDescriptionDesktop}` }>
									<p>
										{ post.description }
									</p>
								</div>
							</div>
						</a>
						<div className={ `${ styles.largeBottom } ${ styles.largeBottomDesktop }` }>
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
									<p>
										6 min
									</p>
								</div>
								<span className={styles.postsBlockLargeInfoBullet}>
									&bull;
								</span>
								<div className={styles.postsBlockLargeInfoText}>
									<p>
										10 minutes ago
									</p>
								</div>
							</div>
							<a href={ '#' } className={ styles.largeBookmark }>
								<Icon iconName={ 'Bookmark' } className={ styles.largeBookmarkIcon } />
							</a>
							<a href={ `posts/${ post.path }` } className={ styles.largeGoTo }>
								<p>
									Read more
								</p>
								<Icon iconName={ 'ChevronRight' } className={ styles.largeGoToIcon } />
							</a>
						</div>
					</div>
					<a href={ `posts/${ post.path }` }>
						<img src={ 'https://preview.redd.it/e6mr16a9ah071.jpg?width=640&crop=smart&auto=webp&s=bf7f4c3e7f590df70fab692ed64040b27691df76' } alt={ 'post' }/>
					</a>
				</div>

				<div className={ styles.largeBottomSmartphone }>
					<div className={ `${ styles.largeDescription } ${ styles.largeDescriptionSmartphone }` }>
						<h3 className={ styles.largeBottomTitle }>
							{ post.title }
						</h3>
						<a href={ '#' } className={ styles.largeGoTo }>
							<p>
								Read more
							</p>
							<Icon iconName={ 'ChevronRight' } className={ styles.largeGoToIcon } />
						</a>
					</div>
				</div>
			</div>
		)
	}
}

export default PostsBlockLarge
