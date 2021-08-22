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
				<a href={'#'}>
					<img className={ styles.authorAvatar } src={ defaultThumbnail } alt={ 'author' }/>
					<div className={ styles.authorContent }>
						<p className={ styles.authorContentName }>
							Sidney Goossens
						</p>
						<p className={ styles.authorContentDescription }>
							Software Engineer and just an overall nice guy
						</p>
						<div className={ styles.authorContentBottomDesktop }>
							<p className={ styles.authorContentBottomDesktopPosts }>
								? posts
							</p>
							<span className={ styles.authorContentBottomDesktopGoTo }>
								<Icon iconName={ 'ChevronRight' } className={ styles.authorContentBottomDesktopGoToIcon } />
							</span>
						</div>
						<div className={ styles.authorContentBottomSmartphone }>
							<div className={ styles.authorContentBottomSmartphoneStat }>
								<p className={ styles.authorContentBottomSmartphoneStatData }>
									10K
								</p>
								<p className={ styles.authorContentBottomSmartphoneStatTitle }>
									Followers
								</p>
							</div>
							<div className={ styles.authorContentBottomSmartphoneStat }>
								<p className={ styles.authorContentBottomSmartphoneStatData }>
									103
								</p>
								<p className={ styles.authorContentBottomSmartphoneStatTitle }>
									Following
								</p>
							</div>
							<div className={ styles.authorContentBottomSmartphoneStat }>
								<p className={ styles.authorContentBottomSmartphoneStatData }>
									214
								</p>
								<p className={ styles.authorContentBottomSmartphoneStatTitle }>
									Posts
								</p>
							</div>
							<span className={ styles.authorContentBottomSmartphoneGoTo }>
								<Icon iconName={ 'ChevronRight' } className={ styles.authorContentBottomSmartphoneGoToIcon } />
							</span>
						</div>
					</div>
				</a>
			</div>
		)
	}
}

export default TopAuthorsAuthor
