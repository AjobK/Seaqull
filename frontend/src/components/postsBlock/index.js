import React, { Component } from 'react'
import { PostsBlockLarge, PostsBlockSmall } from '../../components'
import styles from './postsBlock.scss'

class PostsBlock extends Component {
	constructor(props) {
		super(props)
		this.posts = props.posts
	}

	render() {
		return (
			<div className={styles.postsBlockWrapper}>
				<div className={styles.postsBlock}>
					{ this.posts[0] && (
						<div className={styles.large1}>
							<PostsBlockLarge post={ this.posts[0] }/>
						</div>
					)}
					{ this.posts[1] && (
						<div className={styles.large2}>
							<PostsBlockLarge post={ this.posts[1] }/>
						</div>
					)}
					<div className={`${styles.small} ${styles.small1}`}>
						{ this.posts[2] && (
							<PostsBlockSmall post={ this.posts[2] }/>
						)}
						{ this.posts[3] && (
							<PostsBlockSmall post={ this.posts[3] }/>
						)}
					</div>
					<div className={`${styles.small} ${styles.small2}`}>
						{ this.posts[4] && (
							<PostsBlockSmall post={ this.posts[4] }/>
						)}
						{ this.posts[5] && (
							<PostsBlockSmall post={ this.posts[5] }/>
						)}
					</div>
				</div>
			</div>
		)
	}
}

export default PostsBlock
