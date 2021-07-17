import React, { Component } from 'react'
import { Loader } from '../../components'
import styles from './posts.scss'
import { PopUp } from '../../components'
import { EditorState, Editor, RichUtils, convertFromRaw, convertToRaw, ContentState } from 'draft-js'
import Axios from 'axios'

class Posts extends Component {
	constructor(props) {
		super(props)
		this.data = []
		this.page = 0
		this.totalPages = null
		this.scrolling = false
	}

	loadArticle = () => {
		Axios.defaults.baseURL = 'http://localhost:8000'
		const url = `/api/post/?page=`+this.page // ?page=${this.page}`

		Axios.get(url,  {withCredentials: true})
			.then(response => response.data)
			.then(json => {
				// if (!this.totalPages) this.totalPages = json.data.last_page
				if(json.message != null) {
					this.page = 0
					this.loadArticle()
				}
				this.data = json.posts
				this.setNewPosts()
			})
	}

	setNewPosts() {
		let singleLi = document.createElement('li')

		singleLi.classList.add(styles.post)

		for (let i = 0; i < this.data.length; i++) {
			let randomRGB = {
				red: Math.random() * 255,
				green: Math.random() * 255,
				blue: Math.random() * 255
			}
			let { red, green, blue } = randomRGB
			let rgb = `rgb(${red},${green},${blue})`

			let article = document.createElement('a')

			article.href = `posts/${this.data[i].path}`
			article.style.backgroundColor = rgb
			article.classList.add(styles.postItem)
			let postItem = document.createElement('div')

			try {
				postItem.innerText = convertFromRaw(JSON.parse(this.data[i].title)).getPlainText()
			} catch (e) {
				postItem.innerText = this.data[i].title
			}

			postItem.classList.add(styles.postItemText)
			article.appendChild(postItem)
			singleLi.appendChild(article)
		}
		document.getElementsByClassName(styles.article)[0].appendChild(singleLi)
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
		const lastLi = document.querySelector('.' + styles.article)
		const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight
		const pageOffset = window.pageYOffset + window.innerHeight
		let bottomOffset = window.innerHeight

		if (pageOffset > lastLiOffset - bottomOffset){
			this.loadMore()
		}
		
		if (window.pageYOffset >= document.body.clientHeight)
			window.scrollTo(0, document.body.clientHeight)
	}


	loadMore = () => {
		this.page = this.page + 1

		this.scrolling = true
		this.loadArticle()
	}

	render() {
		return (
			<div>
				<ul className={styles.article} />
				<Loader />
			</div>
		)
	}
}

export default Posts
