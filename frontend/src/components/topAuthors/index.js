import React, {Component, createRef, useRef} from 'react'
import styles from './topAuthors.scss'
import { InView } from 'react-intersection-observer'
import { inject, observer } from 'mobx-react'
import { Icon, TopAuthorsAuthor } from '../index'

@inject('store') @observer
class TopAuthors extends Component {
	constructor(props) {
		super(props)

		this.authorCardListRef = createRef()

		this.state = {
			topAuthors: [],
			visibleAuthors: [],
			pages: [],
			activePage: 1,
			authorCardWidth: 0
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
			...this.state,
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

		const authorCardListWidth = this.authorCardListRef.current.getBoundingClientRect().width

		this.setState({
			...this.state,
			pages: this.calculatePages(visibleAuthors.length),
			authorCardWidth: authorCardListWidth / visibleAuthors.length
		})

		console.log(authorCardListWidth / visibleAuthors.length)
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

	pageForward = () => {
		let newActivePage = this.state.activePage + 1

		this.setState({
			...this.state,
			activePage: newActivePage > this.state.pages.length
				? 0
				: newActivePage
		})
	}

	pageBack = () => {
		let newActivePage = this.state.activePage - 1

		this.setState({
			...this.state,
			activePage: newActivePage <= 0
				? this.state.pages.length
				: newActivePage
		})
	}

	render() {
		const { topAuthors, pages, activePage, authorCardWidth } = this.state

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
						{/* Add InView here? */}
						<ul className={ styles.topAuthorsContentAuthorsList } ref={ this.authorCardListRef }>
							{ topAuthors.map(( topAuthor ) => {
								return <li key={ topAuthor._id } style={{ transform: `translateX(-${activePage * authorCardWidth}px)` }}>
									<InView id={ topAuthor._id } onChange={ this.onAuthorViewportChange }>
										<TopAuthorsAuthor/>
									</InView>
								</li>
							})}
						</ul>
					</div>
					<div className={ styles.topAuthorsContentPages }>
						<div className={ styles.topAuthorsContentPagesTop }>
							<div className={ `${ styles.topAuthorsContentPagesTopPage }` }/>
							<div className={ `${ styles.topAuthorsContentPagesTopPage } ${ styles.activePage }` }/>
						</div>
						<div className={ styles.topAuthorsContentPagesBottom }>
							<span onClick={ this.pageBack } className={ styles.topAuthorsContentPagesBottomNavigator }>
								<Icon iconName={ 'ChevronLeft' } className={ styles.topAuthorsContentPagesBottomNavigatorIcon } />
							</span>
							<p className={ styles.topAuthorsContentPagesBottomPageCounter }>
								{ activePage }/{ pages.length }
							</p>
							<span onClick={ this.pageForward  } className={ styles.topAuthorsContentPagesBottomNavigator }>
								<Icon iconName={ 'ChevronRight' } className={ styles.topAuthorsContentPagesBottomNavigatorIcon } />
							</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default TopAuthors
