import React, { Component } from 'react'
import { Icon } from '../../components'
import TimeUtil from '../../util/timeUtil'
import styles from './postsBlockSmall.scss'
import defaultThumbnail from '../../static/images/default-thumbnail.jpg'

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
						<a href={ '#' } className={ styles.smallThumbnailContentCategory }>
							<span className={ styles.smallThumbnailContentCategoryBullet }>
								<Icon iconName={ 'Circle' } />
							</span>
							<p>
								Machine learning
								<span>{/* UNDERLINE */}</span>
							</p>
						</a>
						<span className={ styles.bookmark } onClick={ this.bookmarkPost }>
							<Icon iconName={ 'Bookmark' } />
						</span>
					</div>
					<a href={ `posts/${ post.path }` }>
						<img src={ defaultThumbnail } alt={ 'post' } />
					</a>
				</div>
				<a href={ `posts/${ post.path }` } className={ styles.smallContent}>
					<div>
						<div>
							<h4 className={ styles.smallContentTitle }>
								{ post.title }
							</h4>
							<p className={ styles.smallContentDescription }>
								{ post.description }
							</p>
						</div>
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
										{ TimeUtil.timeAgo(new Date(post.created_at)) }
									</p>
								</div>
							</div>
							<span className={ styles.bookmark } onClick={ this.bookmarkPost }>
								<Icon iconName={ 'Bookmark' } />
							</span>
							<div className={ styles.smallContentBottomGoTo }>
								<Icon iconName={ 'ChevronRight' } />
							</div>
						</div>
					</div>
				</a>
			</div>
		)
	}
}

export default PostsBlockSmall
