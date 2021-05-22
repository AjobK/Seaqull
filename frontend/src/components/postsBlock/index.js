import React, { Component } from 'react'
import { Loader, PostsBlockLarge, PostsBlockSmall } from '../../components'
import styles from './postsBlock.scss'

/*
 * Structure prop
 * LS = Large on left, small on right
 * LL = Large on left, large on right
 * SL = Small on left, large on right
 * SS = Small on left, small on right
 */

class PostsBlock extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { structure } = this.props

		return (
			<div className={styles.postsBlockWrapper}>
				<div className={styles.postsBlock}>

					{ (structure === 'LS' || structure === 'LL') && (
						<PostsBlockLarge/>
					)}
					{ (structure === 'SL' || structure === 'SS') && (
						<div className={styles.small}>
							<PostsBlockSmall/>
							<PostsBlockSmall/>
						</div>
					)}

					{ (structure === 'SL' || structure === 'LL') && (
						<PostsBlockLarge/>
					)}
					{ (structure === 'LS' || structure === 'SS') && (
						<div className={styles.small}>
							<PostsBlockSmall/>
							<PostsBlockSmall/>
						</div>
					)}

				</div>
			</div>
		)
	}
}

export default PostsBlock
