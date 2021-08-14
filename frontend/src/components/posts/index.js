import React, { Component, lazy, Suspense } from 'react'
import { inject, observer } from 'mobx-react'
import Axios from 'axios'
import styles from './posts.scss'
import { Loader, TopAuthors } from '../../components'
const PostsBlock = lazy(() => import('../../components/postsBlock'))

@inject('store') @observer
class Posts extends Component {
	constructor(props) {
		super(props)

		this.MAX_POSTS_IN_FIRST_BLOCK = 6
		this.MAX_POSTS_IN_BLOCK = 10

		this.state = {
			postsBlocks: [],
			isFetching: false,
			page: 0,
			endReached: false,
			topAuthorsShowed: false //todo temporary until better fix
		}
	}

	componentDidMount() {
		this.fetchPosts(this.MAX_POSTS_IN_FIRST_BLOCK)

		window.addEventListener('scroll', this.handleScroll)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll)
	}

	fetchPosts = (maxPosts) => {
		this.setIsFetching(true)

		Axios.get(`${ this.props.store.defaultData.backendUrl }/post/?page=${ this.state.page }&amount=${ maxPosts }`,
			{ withCredentials: true })
			.then(response => response.data)
			.then(json => {
				this.setIsFetching(false)

				if (json.message) {
					this.setEndReached(true)

					return
				}

				this.setCurrentPage(this.state.page + 1)
				this.renderNewPosts(json.posts ? json.posts : [])

				if (json.posts.length < maxPosts) {
					this.setEndReached(true)
				}

				this.handleScroll()
			})
			.catch((err) => {
				this.setIsFetching(false)
			})
	}

	setEndReached(endReached) {
		this.setState({
			...this.state,
			endReached
		})
	}

	setIsFetching = (isFetching) => {
		this.setState({
			...this.state,
			isFetching
		})
	}

	setCurrentPage = (page) => {
		this.setState({
			...this.state,
			page
		})
	}

	fetchMorePosts = () => {
		if (this.state.endReached) {
			this.setCurrentPage(0)
			this.setEndReached(false)
			this.fetchPosts()
			return
		}

		this.fetchPosts(this.MAX_POSTS_IN_BLOCK)
	}

	handleScroll = () => {
		if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight
			|| this.state.isFetching
		) {
			return
		}

		this.fetchMorePosts()
	}

	renderNewPosts = (posts) => {
		let singleLi = document.createElement('li')

		singleLi.classList.add(styles.post)

		let postsBlocks = this.state.postsBlocks

		postsBlocks.push(
			this.createPostsBlock(posts)
		)

		if (!this.state.topAuthorsShowed) { // todo temporary until better fix
			postsBlocks.push(
				this.createTopAuthors()
			)
			this.setState({
				topAuthorsShowed: true
			})
		}

		this.setState({
			...this.state,
			postsBlocks
		})
	}

	createPostsBlock = (posts) => {
		return (
			<li key={ Math.random() } className={ styles.postsBlock }>
				<Suspense fallback={ <div>Loading...</div> }>
					<PostsBlock posts={ posts }/>
				</Suspense>
			</li>
		)
	}

	createTopAuthors = () => {
		return (
			<li key={ Math.random() } className={ styles.fullWidth }>
				<TopAuthors />
			</li>
		)
	}

	render() {
		const { postsBlocks } = this.state

		return (
			<div>
				<ul className={ styles.posts }>
					{ postsBlocks }
				</ul>
				{ this.state.isFetching || !this.state.endReached && (
					<Loader />
				)}
			</div>
		)
	}
}

export default Posts
