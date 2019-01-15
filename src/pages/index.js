import React, { Component} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"
import { initStore } from '../stores'
import { Provider } from 'mobx-react'
import Home from './home'
import Profile from './profile'

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
						<Route path="/" exact component={Home} />
						<Route path="/profile" exact component={Profile} />
					</div>
				</Router>
			</Provider>
		)
	}
}

export default AppRouter
