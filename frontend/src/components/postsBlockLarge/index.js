import React, { Component } from 'react'
import {Icon, Loader} from '../../components'
import styles from './postsBlockLarge.scss'
import PostsBlockLargeInfo from '../postsBlockLargeInfo'

class PostsBlockLarge extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { post } = this.props

		return (
			<div className={ styles.large }>
				<div className={ styles.largeThumbnail }>
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
						<div className={ styles.largeBottom }>
							<PostsBlockLargeInfo />
							<a href="#">
								<span className={styles.largeBottomBookmark}>
									<Icon iconName={'Bookmark'} className={styles.largeBottomBookmarkIcon} />
								</span>
							</a>
						</div>
					</div>
					<a href={ `posts/${ post.path }` }>
						<img src={'https://preview.redd.it/e6mr16a9ah071.jpg?width=640&crop=smart&auto=webp&s=bf7f4c3e7f590df70fab692ed64040b27691df76'} alt={'post'}/>
					</a>
				</div>
				<div className={ styles.largeBottomSmartphone }>
					<PostsBlockLargeInfo />
					<div className={ `${styles.largeDescription} ${styles.largeDescriptionSmartphone}` }>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
						<div className={ styles.largeDescriptionSmartphoneGoToBtn }>
							<p>Read more</p>
							<Icon iconName={'ChevronRight'} className={ styles.largeDescriptionSmartphoneGoToBtnIcon } />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default PostsBlockLarge
