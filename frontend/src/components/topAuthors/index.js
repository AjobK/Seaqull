import React, { Component } from 'react'
import styles from './topAuthors.scss'
import { inject, observer } from 'mobx-react'
import { Icon, TopAuthorsAuthor } from '../index'

@inject('store') @observer
class TopAuthors extends Component {
	constructor(props) {
		super(props)

		this.MAX_AUTHORS_IN_PAGE = 4

		this.state = {
			topAuthors: []
		}
	}

	componentDidMount() {
		this.fetchTopAuthors()
	}

	fetchTopAuthors() {
		const topAuthors = [1, 2, 3, 4, 5, 6, 7, 8, 9]
		const pages = []

		let pointer = 0
		let page = []
		topAuthors.forEach((author) => {
			pointer++
			page.push(author)
			console.log(pointer)

			if (pointer >= this.MAX_AUTHORS_IN_PAGE) {
				pages.push(page)
				page = []
				pointer = 0
			}
		})

		if (page.length > 0) {
			pages.push(page)
		}


		this.setState({
			topAuthors: [{}, {}, {}, {}, {}, {}, {}, {}]
		})
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
						<div className={ `${ styles.topAuthorsContentAuthorsOverlay } ${ styles.overlayFadeRight }` } />
						<ul className={ styles.topAuthorsContentAuthorsList }>
							<li> <TopAuthorsAuthor/> </li>
							<li> <TopAuthorsAuthor/> </li>
							<li> <TopAuthorsAuthor/> </li>
							<li> <TopAuthorsAuthor/> </li>
							{/*<li> <TopAuthorsAuthor/> </li>*/}
							{/*<li> <TopAuthorsAuthor/> </li>*/}
							{/*<li> <TopAuthorsAuthor/> </li>*/}
							{/*<li> <TopAuthorsAuthor/> </li>*/}
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
