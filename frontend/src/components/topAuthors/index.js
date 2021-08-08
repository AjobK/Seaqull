import React, { Component } from 'react'
import styles from './topAuthors.scss'
import { inject, observer } from 'mobx-react'
import { Icon, TopAuthorsAuthor } from '../index'

@inject('store') @observer
class TopAuthors extends Component {
	constructor(props) {
		super(props)

		this.state = {

		}
	}

	render() {
		const { } = this.props

		return (
			<div className={ styles.topAuthors }>
				<div className={ styles.topAuthorsContent }>
					<div className={ styles.topAuthorsContentTop }>
						<header className={ styles.topAuthorsContentTopHeader }>
							<h2 className={ styles.topAuthorsContentTopHeaderTitle }>
								Top Authors
							</h2>
							<p className={ styles.topAuthorsContentTopHeaderMessage }>
								Learn from the best craftsmen in the world
							</p>
						</header>
						<a href={'#'} className={ styles.topAuthorsContentTopViewMore }>
							<p>
								View more authors
								<span>{/* UNDERLINE */}</span>
							</p>
							<span className={ styles.topAuthorsContentTopViewMoreIcon }>
								<Icon iconName={ 'ChevronRight' } />
							</span>
						</a>
					</div>
					<div className={ styles.topAuthorsContentAuthors }>
						<div className={ styles.topAuthorsContentAuthorsOverlay } />
						<ul className={ styles.topAuthorsContentAuthorsList }>
							<li>
								<TopAuthorsAuthor />
							</li>
							<li>
								<TopAuthorsAuthor />
							</li>
							<li>
								<TopAuthorsAuthor />
							</li>
							<li>
								<TopAuthorsAuthor />
							</li>
						</ul>
						<div>

						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default TopAuthors
