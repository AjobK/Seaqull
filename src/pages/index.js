import React, { Component} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"
import { initStore } from '../stores'
import { Provider } from 'mobx-react'
// import Home from './home'
// import Profile from './profile'
// import Post from './post'

class AppRouter extends Component {
	constructor (props) {
		super(props)
		this.store = initStore(true)
	}	

	render () {
		return (
			<Provider store={this.store}>
				<Router>
					<div>
						IE WORKS
					</div>
				</Router>
			</Provider>
		)
	}
}

export default AppRouter
