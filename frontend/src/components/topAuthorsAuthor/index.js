import React, { Component } from 'react'
import styles from './topAuthorsAuthor.scss'
import { inject, observer } from 'mobx-react'

@inject('store') @observer
class TopAuthorsAuthor extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { } = this.props

		return (
			<div className={ styles.author }>

			</div>
		)
	}
}

export default TopAuthorsAuthor
