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
		this.initialVisibilityArray = []

		this.state = {
			topAuthors: [],
			pages: [],
			activePage: 1,
			authorCardWidth: 0,
			sensorEnabled: true,
		}

		window.addEventListener('resize', () => {
			this.setState({ pages: new Array(this.calculatePages()) })
		})
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
			pages: [],
			topAuthors
		}, () => {
			this.initialVisibilityArray = new Array(topAuthors.length).fill(null)
		})
	}

	onAuthorViewportChange = (isVisible, entry) => {
		if (!this.state.sensorEnabled)
			return

		let authorcount = entry.target.getAttribute('authorcount') * 1
		console.log('AUTHOR COUNT?')
		console.log(authorcount)

		if (this.initialVisibilityArray[authorcount] == null)
			this.initialVisibilityArray[authorcount] = isVisible

		if (this.state.pages.length == 0 && !this.initialVisibilityArray.some(i => i == null))
			this.setState({ pages: new Array(this.calculatePages()) })

		console.log('\n--- Should I calculate? ---')
		console.log('AUTHOR COUNT ' + authorcount)
		console.log('INVIS ARRAY')
		console.log(this.initialVisibilityArray)

		const authorCardWidth = this.authorCardListRef.current.children[0].getBoundingClientRect().width

		this.setState({
			...this.state,
			authorCardWidth
		})
	}

	calculatePagesResized = () => {
		console.log('CALC RESIZED')
		let visibleCount = 0
		console.log(this.initialVisibilityArray)
		this.initialVisibilityArray.forEach((item, index) => {
			if (item == null)
				visibleCount = index
		})

		return Math.ceil(
			this.initialVisibilityArray.length / visibleCount
		)
	}

	calculatePages = () => {
		console.log('CALCULATINGGGG')
		let visibleCount = this.initialVisibilityArray.filter(
			i => i == true
		).length
		console.log(visibleCount)

		return Math.ceil(
			this.initialVisibilityArray.length / visibleCount
		)
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
		const { activePage, authorCardWidth } = this.state
		let xToMove

		xToMove = activePage > 1
			? ((activePage - 1) * this.initialVisibilityArray.filter((i) => i == true).length * authorCardWidth)
			: 0

		return xToMove
	}

	render() {
		console.log('Rerendering!!')
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
							{ topAuthors.map(( topAuthor, i ) => (
								<li key={ topAuthor._id } style={{ transform: `translateX(-${this.getXToMove()}px)` }}>
									<InView id={ topAuthor._id } onChange={ this.onAuthorViewportChange } authorcount={i}>
										<TopAuthorsAuthor/>
									</InView>
								</li>
							))}
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
