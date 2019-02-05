import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import styles from './main.scss'

@inject('store') @observer
class Main extends Component {
	createDummyGrid = () => {
		let gridBlocks = []
		for (let i = 0; i < 30; i++) {
			let randomWord = 'Hello'
			let color = `rgb(
				${Math.floor(Math.random() * 255)},
				${Math.floor(Math.random() * 255)},
				${Math.floor(Math.random() * 255)})
			`

    for (let i = 0; i < 30; i++) {
      let randomWord = 'Article'
      let color = `rgb(
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)})
      `

      gridBlocks.push(
        <Link to={`/posts/${randomWord.split(' ').join('-')}`} key={i} className={styles.menuItem}>
          <div className={styles.dummyBlock} style={{ backgroundColor: color }}>
            <p className={styles.dummyBlockText}>{randomWord}</p>
          </div>
        </Link>
      )
    }

    return gridBlocks
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.grid}>
            {this.createDummyGrid()}
          </div>
        </div>
      </div>
    )
  }
}

export default Main
