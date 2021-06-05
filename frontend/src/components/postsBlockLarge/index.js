import React, { Component } from 'react'
import {Icon, Loader} from '../../components'
import styles from './postsBlockLarge.scss'
import PostsBlockLargeInfo from '../postsBlockLargeInfo'

class PostsBlockLarge extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className={ styles.large }>
				<div className={ styles.largeThumbnail }>
					<div className={ styles.largeThumbnailOverlay }>
						<h3 className={ styles.largeThumbnailOverlayTitle }>The Seaqull Resource Library, with some extra words</h3>
						<div className={ styles.largeThumbnailOverlayDesktop }>
							<div className={ `${styles.largeDescription} ${styles.largeDescriptionDesktop}` }>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
							</div>
							<PostsBlockLargeInfo />
						</div>
					</div>
					<img src={'https://preview.redd.it/e6mr16a9ah071.jpg?width=640&crop=smart&auto=webp&s=bf7f4c3e7f590df70fab692ed64040b27691df76'} alt={'post'}/>
				</div>
				<div className={ styles.largeBottomSmartphone }>
					<PostsBlockLargeInfo />
					<div className={ `${styles.largeDescription} ${styles.largeDescriptionSmartphone}` }>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
					</div>
				</div>
			</div>
		)
	}
}

export default PostsBlockLarge
