import React, { Component } from 'react'
import { PostsBlockLarge, PostsBlockSmall } from '../../components'
import styles from './postsBlock.scss'

class PostsBlock extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className={styles.postsBlockWrapper}>
				<div className={styles.postsBlock}>
					<div className={styles.large1}>
						<PostsBlockLarge post={this.props.large[0]}/>
					</div>
					<div className={styles.large2}>
						<PostsBlockLarge post={this.props.large[1]}/>
					</div>
					<div className={`${styles.small} ${styles.small1}`}>
						<PostsBlockSmall post={this.props.small[0]}/>
						<PostsBlockSmall post={this.props.small[1]}/>
					</div>
					<div className={`${styles.small} ${styles.small2}`}>
						<PostsBlockSmall post={this.props.small[2]}/>
						<PostsBlockSmall post={this.props.small[3]}/>
					</div>
				</div>
			</div>
		)
	}
}

export default PostsBlock
