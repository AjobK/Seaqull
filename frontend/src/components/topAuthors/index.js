import React, { Component } from 'react'
import styles from './topAuthors.scss'
import { InView } from 'react-intersection-observer'
import { inject, observer } from 'mobx-react'
import { Icon, TopAuthorsAuthor } from '../index'

@inject('store') @observer
class TopAuthors extends Component {
	constructor(props) {
		super(props)

		this.MAX_AUTHORS_IN_PAGE = 4

		this.state = {
			topAuthors: [],
			visibleAuthors: [],
			pages: []
		}
	}

	componentDidMount() {
		this.fetchTopAuthors()
	}

	fetchTopAuthors() {
		const topAuthors = [
			{_id: 1}, {_id: 2}, {_id: 3}, {_id: 4}, {_id: 5}, {_id: 6}, {_id: 7}, {_id: 8}, {_id: 9}
		]

		this.setState({
			topAuthors
		})
	}

	onAuthorViewportChange = (isVisible, entry) => {
		let visibleAuthors = this.state.visibleAuthors

		visibleAuthors = isVisible
			? visibleAuthors.concat(entry.target.id)
			: visibleAuthors.filter((authorId) => authorId !== entry.target.id)

		this.setState({
			visibleAuthors
		})

		if (visibleAuthors.length <= 0)
			return

		this.setState({
			...this.state,
			pages: this.calculatePages(visibleAuthors.length)
		})
	}

	calculatePages = (authorsInPage) => {
		const pages = []

		let pointer = 0
		let page = []
		this.state.topAuthors.forEach((author) => {
			pointer++
			page.push(author)

			if (pointer >= authorsInPage) {
				pages.push(page)
				page = []
				pointer = 0
			}
		})

		if (page.length > 0) {
			pages.push(page)
		}

		return pages
	}

	render() {
		const { topAuthors, pages } = this.state

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
							{ topAuthors.map(( topAuthor ) => {
								return <li key={ topAuthor._id }>
									<InView id={ topAuthor._id } onChange={ this.onAuthorViewportChange }>
										<TopAuthorsAuthor/>
									</InView>
								</li>
							})}
						</ul>
						<div>
							1/{pages.length}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default TopAuthors
