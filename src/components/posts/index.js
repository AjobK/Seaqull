import React, { Component } from 'react'
import { Loader } from '../../components'
import fetch from 'isomorphic-fetch'
import styles from './posts.scss'

class Posts extends Component {
  constructor(props) {
    super(props)
    this.data = []
    this.per = 5
    this.page = 1
    this.totalPages = 100
    this.scrolling = false
  }

  loadContacts = () => {
    const { page, per } = this
    const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${per}`

    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (!this.totalPages) this.totalPages = json.total_pages

        this.data = json
        this.setNewPosts()
        this.scrolling = false
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

      let article = document.createElement('article')

      article.style.backgroundColor = rgb
      article.classList.add(styles.contact)
      let contactText = document.createElement('div')

      contactText.innerText = `${this.per * (this.page-1) + i}. ${this.data[i].title}`
      contactText.classList.add(styles.contactText)
      article.appendChild(contactText)
      singleLi.appendChild(article)
    }
    document.getElementsByClassName(styles.contacts)[0].appendChild(singleLi)
  }

  componentWillMount() {
    this.loadContacts()
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const { scrolling } = this

    if (scrolling) return
    const lastLi = document.querySelector('.' + styles.contacts)
    const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight
    const pageOffset = window.pageYOffset + window.innerHeight
    let bottomOffset = window.innerHeight

    if (pageOffset > lastLiOffset - bottomOffset)
      this.loadMore()

    if (window.pageYOffset >= document.body.clientHeight)
      window.scrollTo(0, document.body.clientHeight)
  }


  loadMore = () => {
    this.page = this.page >= this.totalPages / this.per ? 1 : this.page + 1;

    this.scrolling = true
    this.loadContacts()
  }

  render() {
    return (
      <div>
        <ul className={styles.contacts} />
        <Loader />
      </div>
    )
  }
}

export default Posts
