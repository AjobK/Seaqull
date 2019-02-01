import React, { Component} from "react";
import { BrowserRouter as Router } from "react-router-dom"
import { initStore } from '../stores'
import { Provider } from 'mobx-react'
// import Home from './home'
// import Profile from './profile'
// import Post from './post'
import { Button } from '../components'

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
						<h1> IE11 Working </h1>
						<Button />
						{/* <Route path="/" exact component={Home} /> 
						<Route path="/profile" exact component={Profile} />
						<Route path="/posts" exact component={Post} />
						<Route path="/posts/:postUrl" exact component={Post} /> */}
					</div>
				</Router>
			</Provider>
		)
	}
}

export default AppRouter
