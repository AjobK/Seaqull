import React, { Component } from 'react'
import styles from './ellipsisTest.scss'

class EllipsisTest extends Component {
	render() {
		return (
			<div className={styles.wrapper}>
				<h2 className={styles.ellipsis}>
					{this.props.value}
				</h2>
			</div>
		)
	}
}

export default EllipsisTest
