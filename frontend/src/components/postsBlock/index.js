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
				<div className={`${styles.postsBlock} ${styles.postsBlockDesktop}`}>

					<div className={styles.large1}>
						<PostsBlockLarge/>
					</div>
					<div className={`${styles.small} ${styles.small1}`}>
						<PostsBlockSmall/>
						<PostsBlockSmall/>
					</div>
					<div className={styles.large2}>
						<PostsBlockLarge/>
					</div>
					<div className={`${styles.small} ${styles.small2}`}>
						<PostsBlockSmall/>
						<PostsBlockSmall/>
					</div>


					{/*<div className={styles.postsBlockR1}>*/}
					{/*	<PostsBlockLarge/>*/}
					{/*	<div className={styles.small}>*/}
					{/*		<PostsBlockSmall/>*/}
					{/*		<PostsBlockSmall/>*/}
					{/*	</div>*/}
					{/*</div>*/}
					{/*<div className={styles.postsBlockR2}>*/}
					{/*	<PostsBlockLarge/>*/}
					{/*	<div className={styles.small}>*/}
					{/*		<PostsBlockSmall/>*/}
					{/*		<PostsBlockSmall/>*/}
					{/*	</div>*/}
					{/*</div>*/}



				</div>
			</div>
		)
	}
}

export default PostsBlock
