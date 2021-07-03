import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Route, Redirect } from 'react-router-dom'

@inject('store') @observer
class GuardedRoute extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { user, profile } = this.props.store

        return (
            <Route {...this.props.rest} render={(props) => {
                console.log(this.props.store)
                console.log(profile.loggedIn)
                return profile.loggedIn
                ? <Component {...props} /> 
                : <Redirect to='/' /> 
            }} 
            />
        )
    }
}


export default GuardedRoute