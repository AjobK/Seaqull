import React, { Component } from 'react'
import styles from './topAuthors.scss'
import { inject, observer } from 'mobx-react'
import {Icon} from "../index";

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
					<div>
						<div>
							authors..
						</div>
						<div>
							page..
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default TopAuthors
