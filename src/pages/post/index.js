import React from 'react'
import App from '../App'
import { Link } from "react-router-dom";

class Post extends App {
	render() {
		const { postUrl } = this.props.match.params
		const pageNumber = postUrl ? Number(postUrl) + 1 : 1

		return (
			<>
				<h1> This is my Post {this.props.match.params.postUrl || 'NONE'} </h1>
				<Link to='/'>Go home</Link>
				<br />
				<Link to={`/posts/${pageNumber}`}>Go to {pageNumber}</Link>
			</>
		)
	}
}

export default Post
