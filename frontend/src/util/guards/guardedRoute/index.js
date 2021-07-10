import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Route, Redirect } from 'react-router-dom'

@inject('store') @observer
class GuardedRoute extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { profile } = this.props.store
        console.log('getting auth')
        console.log(profile.loaded)
        console.log(profile.loggedIn)

        return (
            <Route {...this.props.rest} render={(props) => {
                if (!profile.loaded) {
                    return <h1>loading</h1>
                }
                return profile.loggedIn
                ? <this.props.component {...props} /> 
                : <Redirect to='/login' /> 
            }} 
            />
        )
    }
}


export default GuardedRoute