import React, { Component } from 'react'
import { Icon } from '../../components'
import styles from './postsBlockSmall.scss'

class PostsBlockSmall extends Component {
	constructor(props) {
		super(props)
	}

	bookmarkPost = () => {

	}

	render() {
		const { post } = this.props

		return (
			<div className={ styles.small }>
				<div className={ styles.smallThumbnail }>
					<div className={ styles.smallThumbnailContent }>
						<a className={ styles.smallThumbnailContentCategory } href={ '#' }>
							<span className={ styles.smallThumbnailContentCategoryBullet }>
									<Icon iconName={ 'Circle' } />
							</span>
							<p>
								Machine learning
							</p>
						</a>
						<span className={ styles.bookmark } onClick={ this.bookmarkPost }>
							<Icon iconName={ 'Bookmark' } />
						</span>
					</div>
					<img src={ 'https://preview.redd.it/e6mr16a9ah071.jpg?width=640&crop=smart&auto=webp&s=bf7f4c3e7f590df70fab692ed64040b27691df76' } alt={ 'post' } />
				</div>
				<div className={ styles.smallContent}>
					<a href={ `posts/${ post.path }` }>
						<h4 className={ styles.smallContentTitle }>
							{ post.title }
						</h4>
						<p className={ styles.smallContentDescription }>
							{ post.description }
						</p>
					</a>
					<div className={ styles.smallContentBottom }>
						<div className={ styles.smallContentBottomInfo }>
							<div className={ styles.smallContentBottomInfoText }>
								<span className={ styles.smallContentBottomInfoTextIcon }>
									<Icon iconName={ 'Stopwatch' } />
								</span>
								<p>
									6 min
								</p>
							</div>
							<span className={ styles.smallContentBottomInfoBullet }>
								&bull;
							</span>
							<div className={ styles.smallContentBottomInfoText }>
								<p>
									10 minutes ago
								</p>
							</div>
						</div>
						<span className={ styles.bookmark } onClick={ this.bookmarkPost }>
							<Icon iconName={ 'Bookmark' } />
						</span>
						<a href={ '#' } className={ styles.smallContentBottomGoTo }>
							<Icon iconName={ 'ChevronRight' } />
						</a>
					</div>
				</div>
			</div>
		)
	}
}

export default PostsBlockSmall
