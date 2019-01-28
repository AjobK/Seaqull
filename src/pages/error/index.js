import React from 'react'
import App from '../App'
import styles from './error.scss'
import { Link } from "react-router-dom";

class Error extends App {
	render() {
		return (
			<section className={styles.wrapper}>
				<h1 className={styles.title}>{this.props.title || '404'}</h1>
				<h3>{this.props.sub || 'Page not found'}</h3>
				<Link to='/'>Go home</Link>
			</section>
		)
	}
}

export default Error
