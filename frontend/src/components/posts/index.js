import React, { Component, useEffect } from 'react'
import { Loader } from '../../components'
import styles from './posts.scss'
import Axios from 'axios'
import PostsBlock from "../postsBlock";
import {inject, observer} from "mobx-react";

@inject('store') @observer
class Posts extends Component {
	constructor(props) {
		super(props)
		this.totalPages = null
		this.scrolling = false
		this.state = {
			data: [],
			postsBlocks: [],
			isFetching: false,
			page: 0
		}
		this.POSTS_IN_POST_BLOCK = 6
	}

	componentDidMount() {
		this.fetchPosts()
		window.addEventListener('scroll', this.handleScroll)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll)
	}

	fetchPosts = () => {
		Axios.get(`/api/post/?page=` + this.state.page, { withCredentials: true })
			.then(response => response.data)
			.then(json => {
				console.log(json)
				// if (!this.totalPages) this.totalPages = json.data.last_page
				// if (json.message != null) {
				// 	this.page = 0
				// 	this.fetchPosts()
				// }
				this.setState({
					...this.state,
					data: json.posts,
					page: this.state.page + 1
				})
				this.renderNewPosts()
			})
	}

	fetchMorePosts = () => {
		this.fetchPosts()
		this.setState({
			...this.state,
			isFetching: false
		})
	}

	handleScroll = () => {
		if (
			Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight
			|| this.state.isFetching) {
			return;
		}
		this.setState({
			...this.state,
			isFetching: true
		})

		console.log(this.state.isFetching)
	}

	renderNewPosts = () => {
		let singleLi = document.createElement('li')

		singleLi.classList.add(styles.post)

		let data = this.state.data
		let postsBlocks = []

		postsBlocks.push(
			this.createPostsBlock(data)
		)

		this.setState({
			...this.state,
			postsBlocks
		})
	}

	createPostsBlock = (posts) => {
		return <PostsBlock posts={posts} key={Math.random()}/>
	}

	render() {
		const { postsBlocks } = this.state

		return (
			<div>
				<ul className={styles.posts}>
					{ postsBlocks }
				</ul>
				<Loader />
			</div>
		)
	}
}

export default Posts
