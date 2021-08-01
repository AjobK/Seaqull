import React, { Component } from 'react'
import { convertFromRaw } from 'draft-js'
import { PostsBlockLarge, PostsBlockSmall } from '../../components'
import styles from './postsBlock.scss'

class PostsBlock extends Component {
	constructor(props) {
		super(props)
		this.state = {
			posts: props.posts
		}
	}
	
	componentDidMount() {
		this.convertPosts()
	}

	convertPosts() {
		let convertedPosts = []

		this.state.posts.forEach((post) => {
			try {
				post.title = convertFromRaw(JSON.parse(post.title)).getPlainText()
			} catch (e) { }

			convertedPosts.push(post)
		})
		this.setState({
			...this.state,
			posts: convertedPosts
		})
	}

	render() {
		const { posts } = this.props
		const shortBlock = posts.length <= 9
		
		return (
			<div className={`${ styles.postsBlock } ${ shortBlock ? styles.shortBlock : styles.longBlock }`}>
				{ posts[0] && (
					<div className={styles.large1}>
						<PostsBlockLarge post={ posts[0] }/>
					</div>
				)}
				<div className={`${styles.small} ${styles.small1}`}>
					{ posts[1] && (
						<PostsBlockSmall post={ posts[1] }/>
					)}
					{ posts[2] && (
						<PostsBlockSmall post={ posts[2] }/>
					)}
				</div>

				{ !shortBlock && (
					<div className={`${styles.small} ${styles.small3}`}>
						{ posts[6] && (
							<PostsBlockSmall post={ posts[3] }/>
						)}
						{ posts[7] && (
							<PostsBlockSmall post={ posts[4] }/>
						)}
					</div>
				)}
				{ !shortBlock && (
					<div className={`${styles.small} ${styles.small4}`}>
						{ posts[8] && (
							<PostsBlockSmall post={ posts[5] }/>
						)}
						{ posts[9] && (
							<PostsBlockSmall post={ posts[6] }/>
						)}
					</div>
				)}

				<div className={`${styles.small} ${styles.small2}`}>
					{ posts[3] && (
						<PostsBlockSmall post={ posts[shortBlock ? 3 : 7] }/>
					)}
					{ posts[4] && (
						<PostsBlockSmall post={ posts[shortBlock? 4 : 8] }/>
					)}
				</div>
				{ posts[5] && (
					<div className={styles.large2}>
						<PostsBlockLarge post={ posts[shortBlock ? 5 : 9] }/>
					</div>
				)}
			</div>
		)
	}
}

export default PostsBlock
