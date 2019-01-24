import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import Post from './posts'
import styles from './posts.scss'

class Posts extends Component {
	constructor(props) {
		super(props)
		this.state = {
			contacts: [],
			per: 5,
			page: 1,
			totalPages: null,
			innerCounter: 0
		}
	}

	loadContacts = () => {
		const { per, page, contacts } = this.state
		const url = `https://student-example-api.herokuapp.com/v1/contacts.json?per=${per}&page=${page}`
		fetch(url)
			.then(response => response.json())
			.then(json => this.setState({
				contacts: [...contacts, ...json.contacts],
				scrolling: false,
				totalPages: json.total_pages,
			}))
	}
	
	componentWillMount() {
		this.loadContacts()
		this.scrollListener = window.addEventListener('scroll', (e) => {
			this.handleScroll(e)
		})
	}

	handleScroll = (e) => {
		const { scrolling, totalPages, page } = this.state
		if (scrolling) return
		if (totalPages <= page) return
		const lastLi = document.querySelector('ul.' + styles.contacts + ' > li:last-child')
		const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight
		const pageOffset = window.pageYOffset + window.innerHeight
		let bottomOffset = window.innerHeight
		if (pageOffset > lastLiOffset - bottomOffset) this.loadMore()
	}


	loadMore = () => {
		const { page, totalPages, startPoint, contacts } = this.state
		let nextPage = page + 1
		if (nextPage >=  totalPages) {
			nextPage = 1
			this.setState({
				startPoint: startPoint + contacts.length
			})
		}

		this.setState(() => ({
			page: nextPage,
			scrolling: true
		}), this.loadContacts)
	}

	render() {
		const { per, totalPages } = this.state
		let innerCount = this.state.innerCounter
		return (
			<div>
				<ul className={styles.contacts}>
					{
						this.state.contacts.map((contact, index) => {
							return (
								<li key={per * totalPages + innerCount + index} className={styles.post}>
									<Post {...contact} />
								</li>
							)
						})
					}
				</ul>
			</div>
		)
	}
}

export default Posts
