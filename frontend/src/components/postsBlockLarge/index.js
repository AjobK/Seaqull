import React, { Component } from 'react'
import TimeUtil from '../../util/timeUtil'
import { Icon } from '../../components'
import styles from './postsBlockLarge.scss'

class PostsBlockLarge extends Component {
	constructor(props) {
		super(props)
	}

	bookmarkPost = () => {

	}

	render() {
		const { post } = this.props

		return (
			<div className={ styles.large }>
				<div className={ styles.largeThumbnail }>
					<span className={ `${ styles.bookmark } ${ styles.bookmarkHover }` } onClick={ this.bookmarkPost }>
						<Icon iconName={ 'Bookmark' } />
					</span>
					<div className={ styles.largeThumbnailContent }>
						<a href={ `posts/${ post.path }` }>
							<h3 className={ styles.largeThumbnailContentTitle }>
								{ post.title }
							</h3>
							<div className={ styles.largeThumbnailContentDescription }>
								<p>
									{ post.description }
								</p>
							</div>
						</a>
						<div className={ styles.largeThumbnailContentBottom }>
							<div className={ styles.largeThumbnailContentBottomInfo }>
								<a href={'#'} className={ styles.largeThumbnailContentBottomInfoCategory }>
									<span className={ styles.largeThumbnailContentBottomInfoCategoryBullet }>
										<Icon iconName={ 'Circle' } />
									</span>
									Machine learning
								</a>
								<span className={ styles.largeThumbnailContentBottomInfoBullet }>
									&bull;
								</span>
								<div className={ styles.largeThumbnailContentBottomInfoText }>
									<span className={ styles.largeThumbnailContentBottomInfoTextIcon }>
										<Icon iconName={ 'Stopwatch' } />
									</span>
									<p>
										6 min
									</p>
								</div>
								<span className={ styles.largeThumbnailContentBottomInfoBullet }>
									&bull;
								</span>
								<div className={ styles.largeThumbnailContentBottomInfoText }>
									<p>
										{ TimeUtil.timeAgo(new Date(post.created_at)) }
									</p>
								</div>
							</div>
							<span className={ styles.bookmark } onClick={ this.bookmarkPost }>
								<Icon iconName={ 'Bookmark' } />
							</span>
							<a href={ `posts/${ post.path }` } className={ styles.goTo }>
								<p>
									Read more
								</p>
								<Icon iconName={ 'ChevronRight' } className={ styles.goToIcon } />
							</a>
						</div>
					</div>
					<a href={ `posts/${ post.path }` }>
						<img src={ 'https://preview.redd.it/e6mr16a9ah071.jpg?width=640&crop=smart&auto=webp&s=bf7f4c3e7f590df70fab692ed64040b27691df76' } alt={ 'post' }/>
					</a>
				</div>

				<div className={ styles.largeBottom }>
					<h3 className={ styles.largeBottomTitle }>
						{ post.title }
					</h3>
					<a href={ '#' } className={ styles.goTo }>
						<p>
							Read more
						</p>
						<Icon iconName={ 'ChevronRight' } className={ styles.goToIcon } />
					</a>
				</div>
			</div>
		)
	}
}

export default PostsBlockLarge
