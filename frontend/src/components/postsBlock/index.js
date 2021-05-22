import React, { Component } from 'react'
import { Loader, PostsBlockLarge, PostsBlockSmall } from '../../components'
import styles from './postsBlock.scss'

class PostsBlock extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className={styles.postsBlockWrapper}>
				<div className={`${styles.postsBlock} ${styles.LRR}`}>
					<PostsBlockLarge/>
					<div className={styles.small}>
						<PostsBlockSmall/>
						<PostsBlockSmall/>
					</div>
				</div>
			</div>
		)
	}
}

export default PostsBlock
