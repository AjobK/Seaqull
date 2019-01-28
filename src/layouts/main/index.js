import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import styles from './main.scss'
import generateRandomWord from 'random-words'

@inject('store') @observer
class Main extends Component {
	createDummyGrid = () => {
		let gridBlocks = []
		for (let i = 0; i < 30; i++) {
			let randomWord = generateRandomWord(3).join(' ')
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

	componentDidMount() {
		document.querySelector(`.${styles.wrapper}`).addEventListener('mousedown', this.preventXScroll)
	}

	preventXScroll = (e) => {
		if (e.which == 2 && this.props.store.ui.subNavOpen) e.preventDefault()
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
