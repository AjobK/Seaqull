import React, { Component } from 'react'
import styles from './topAuthorsAuthor.scss'
import { inject, observer } from 'mobx-react'
import defaultThumbnail from '../../static/dummy/user/profile.jpg'
import {Icon} from "../index";

@inject('store') @observer
class TopAuthorsAuthor extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { } = this.props

		return (
			<div className={ styles.author }>
				<img src={ defaultThumbnail } alt={ 'author' }/>
				<div className={ styles.authorContent }>
					<p className={ styles.authorContentName }>
						Sidney Goossens
					</p>
					<p className={ styles.authorContentDescription }>
						Software Engineer and just an overall nice guy
					</p>
					<div className={ styles.authorContentBottom }>
						<p className={ styles.authorContentBottomPosts }>
							? posts
						</p>
						<span className={ styles.authorContentBottomGoTo }>
							<Icon iconName={ 'ChevronRight' } className={ styles.authorContentBottomGoToIcon } />
						</span>
					</div>
				</div>
			</div>
		)
	}
}

export default TopAuthorsAuthor
