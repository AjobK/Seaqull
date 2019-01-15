import React from 'react'
import App from '../App'
import { Link } from "react-router-dom";

class Profile extends App {
	render() {
		return (
			<>
				<h1> This is my profile </h1>
				<Link to='/'>Go home</Link>
			</>
		)
	}
}

export default Profile
