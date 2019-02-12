import React, { Component } from 'react'
import { Loader } from '../../components'
import fetch from 'isomorphic-fetch'
import styles from './posts.scss'

class Posts extends Component {
  constructor(props) {
    super(props)
    this.contacts = []
    this.per = 5
    this.page = 1
    this.totalPages = null
    this.scrolling = false
  }

  loadContacts = () => {
    const { per, page } = this
    const url = `https://student-example-api.herokuapp.com/v1/contacts.json?per=${per}&page=${page}`

    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (!this.totalPages) this.totalPages = json.total_pages

        this.contacts = json.contacts
        this.setNewContacts()
        this.scrolling = false
      })
  }

  // Checks if user is at end of page
  isAtEndOfPage() {
    const height = window.innerHeight
    const offset = document.body.offsetHeight
    const scrollY = window.pageYOffset

    return scrollY > offset - height - 2
  }

  setNewContacts() {
    let singleLi = document.createElement('li')

    singleLi.classList.add(styles.post)

    for (let i = 0; i < this.contacts.length; i++) {
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

      contactText.innerText = this.contacts[i].name
      contactText.classList.add(styles.contactText)
      article.appendChild(contactText)
      singleLi.appendChild(article)
    }
    document.getElementsByClassName(styles.contacts)[0].appendChild(singleLi)

    // Scroll reset
    if (this.isAtEndOfPage()) {
      window.scrollTo(0, this.offsetTop)
    }
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
    const { totalPages } = this

    if (this.page >= totalPages)
      this.page = 1
    else
      this.page++

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
