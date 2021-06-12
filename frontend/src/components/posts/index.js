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
		this.data = []
		this.page = 0
		this.totalPages = null
		this.scrolling = false
		this.state = {
			postsBlocks: []
		}
	}

	loadArticle = () => {
		Axios.defaults.baseURL = 'http://localhost:8000'
		const url = `/api/post/?page=`+this.page // ?page=${this.page}`

		Axios.get(url,  {withCredentials: true})
			.then(response => response.data)
			.then(json => {
				console.log(json)
				// if (!this.totalPages) this.totalPages = json.data.last_page
				if(json.message != null) {
					this.page = 0
					this.loadArticle()
				}
				this.data = json.posts
				this.setNewPosts()
			})
	}

	createPostsBlock = (largePosts, smallPosts, key) => {
		return <PostsBlock large={largePosts} small={smallPosts} key={key}/>
	}

	setNewPosts = () => {
		let singleLi = document.createElement('li')

		singleLi.classList.add(styles.post)

		this.data = this.data.concat(this.data) // remove
		this.data = this.data.concat(this.data)

		let postIteration = 0
		let postsBlockLarge = []
		let postsBlockSmall = []
		let postsBlocks = []
		for (let i = 0; i < this.data.length; i++) {
			postIteration++
			if (postIteration > 6) {
				postsBlocks.push(this.createPostsBlock(postsBlockLarge, postsBlockSmall, i))
				postIteration = 0
				postsBlockLarge = postsBlockSmall = []
			}

			postsBlockLarge.length < 2
				? postsBlockLarge.push(this.data[i])
				: postsBlockSmall.push(this.data[i])
		}

		this.setState({
			postsBlocks
		})

		// for (let i = 0; i < this.data.length; i++) {
		// 	let randomRGB = {
		// 		red: Math.random() * 255,
		// 		green: Math.random() * 255,
		// 		blue: Math.random() * 255
		// 	}
		// 	let { red, green, blue } = randomRGB
		// 	let rgb = `rgb(${red},${green},${blue})`
		//
		// 	let article = document.createElement('a')
		//
		// 	article.href = `posts/${this.data[i].path}`
		// 	article.style.backgroundColor = rgb
		// 	article.classList.add(styles.postItem)
		// 	let postItem = document.createElement('div')
		//
		// 	try {
		// 		postItem.innerText = convertFromRaw(JSON.parse(this.data[i].title)).getPlainText()
		// 	} catch (e) {
		// 		postItem.innerText = this.data[i].title
		// 	}
		//
		// 	postItem.classList.add(styles.postItemText)
		// 	article.appendChild(postItem)
		// 	singleLi.appendChild(article)
		// }
		// document.getElementsByClassName(styles.posts)[0].appendChild(singleLi)
	}

	componentWillMount() {
		this.loadArticle()
		window.addEventListener('scroll', this.handleScroll)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll)
	}

	handleScroll = () => {
		// Did not fix scroll detection yet

		// const { scrolling } = this
		// if (scrolling) return
		// const lastLi = document.querySelector('.' + styles.article)
		// const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight
		// const pageOffset = window.pageYOffset + window.innerHeight
		// let bottomOffset = window.innerHeight
		//
		// if (pageOffset > lastLiOffset - bottomOffset){
		// 	this.loadMore()
		// }
		//
		// if (window.pageYOffset >= document.body.clientHeight)
		// 	window.scrollTo(0, document.body.clientHeight)
	}


	loadMore = () => {
		this.page = this.page + 1

		this.scrolling = true
		this.loadArticle()
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
