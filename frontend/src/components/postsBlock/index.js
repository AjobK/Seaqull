import React, { Component } from 'react'
import { PostsBlockLarge, PostsBlockSmall } from '../../components'
import styles from './postsBlock.scss'

class PostsBlock extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {large, small} = this.props
		
		return (
			<div className={styles.postsBlockWrapper}>
				<div className={styles.postsBlock}>
					<div className={styles.large1}>
						<PostsBlockLarge post={ large[0] }/>
					</div>
					<div className={styles.large2}>
						<PostsBlockLarge post={ large[1] }/>
					</div>
					<div className={`${styles.small} ${styles.small1}`}>
						<PostsBlockSmall post={ small[0] }/>
						<PostsBlockSmall post={ small[1] }/>
					</div>
					<div className={`${styles.small} ${styles.small2}`}>
						<PostsBlockSmall post={ small[2] }/>
						<PostsBlockSmall post={ small[3] }/>
					</div>
				</div>
			</div>
		)
	}
}

export default PostsBlock
