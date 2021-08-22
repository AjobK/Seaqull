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
			authorCardWidth: 0,
			sensorEnabled: true
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
		if (!this.state.sensorEnabled)
			return

		let visibleAuthors = this.state.visibleAuthors

		visibleAuthors = isVisible
			? visibleAuthors.concat(entry.target.id)
			: visibleAuthors.filter((authorId) => authorId !== entry.target.id)

		this.setState({
			visibleAuthors
		})

		if (visibleAuthors.length <= 0)
			return

		const authorCardWidth = this.authorCardListRef.current.children[0].getBoundingClientRect().width

		this.setState({
			...this.state,
			pages: this.calculatePages(visibleAuthors.length),
			authorCardWidth
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

	pageForward = () => {
		let newActivePage = this.state.activePage + 1
		this.toPage(newActivePage > this.state.pages.length ? 0 : newActivePage)
	}

	pageBack = () => {
		let newActivePage = this.state.activePage - 1
		this.toPage(newActivePage <= 0 ? this.state.pages.length : newActivePage)
	}

	toPage = (newPage) => {
		this.setState({
			...this.state,
			activePage: newPage,
			sensorEnabled: false
		})

		setTimeout(() => {
			this.setState({
				...this.state,
				sensorEnabled: true
			})
		}, 800)
	}

	getXToMove = () => {
		const { activePage, authorCardWidth, visibleAuthors } = this.state
		let xToMove

		xToMove = activePage > 1
			? ((activePage - 1) * visibleAuthors.length) * authorCardWidth
			: 0

		return xToMove
	}

	render() {
		const { topAuthors, pages, activePage } = this.state

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
						<div className={ `${ styles.topAuthorsContentAuthorsOverlay } ${ activePage > 1 ? styles.overlayFadeLeft : styles.overlayHidden }` } />
						<div className={ `${ styles.topAuthorsContentAuthorsOverlay } ${ activePage < pages.length ? styles.overlayFadeRight : styles.overlayHidden }` } />
						{/* Add InView here? */}
						<ul className={ styles.topAuthorsContentAuthorsList } ref={ this.authorCardListRef }>
							{ topAuthors.map(( topAuthor ) => {
								return <li key={ topAuthor._id } style={{ transform: `translateX(-${this.getXToMove()}px)` }}>
									<InView id={ topAuthor._id } onChange={ this.onAuthorViewportChange }>
										<TopAuthorsAuthor/>
									</InView>
								</li>
							})}
						</ul>
					</div>
					<div className={ styles.topAuthorsContentPages }>
						<div className={ styles.topAuthorsContentPagesTopNavigator }>
							{ pages.map(( page, i ) => {
								return <div key={ i }
											className={ `${ styles.topAuthorsContentPagesTopNavigatorPage } ${ activePage === i + 1 ? styles.activePage : '' }` }
											onClick={ () => this.toPage(i + 1) }
								/>
							})}
						</div>
						<div className={ styles.topAuthorsContentPagesBottom }>
							<div className={ styles.topAuthorsContentPagesBottomNavigator }>
								<span onClick={ this.pageBack } className={ styles.topAuthorsContentPagesBottomNavigatorArrow }>
									<Icon iconName={ 'ChevronLeft' } className={ styles.topAuthorsContentPagesBottomNavigatorArrowIcon } />
								</span>
								<p className={ styles.topAuthorsContentPagesBottomNavigatorPageCounter }>
									{ activePage }/{ pages.length }
								</p>
								<span onClick={ this.pageForward } className={ styles.topAuthorsContentPagesBottomNavigatorArrow }>
									<Icon iconName={ 'ChevronRight' } className={ styles.topAuthorsContentPagesBottomNavigatorArrowIcon } />
								</span>
							</div>
							<a href={'#'} className={ styles.topAuthorsContentPagesBottomViewMore }>
								<p>
									View more authors
								</p>
								<span className={ styles.topAuthorsContentPagesBottomViewMoreIcon }>
									<Icon iconName={ 'ChevronRight' } />
								</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default TopAuthors
