import React from 'react'
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom';

@inject('store') @observer
class Profile extends App {
  render() {
    const { user } = this.props.store

    return (
      <>
        <h1> This is my profile </h1>
        <h2> User logged in {user.loggedIn ? 'True' : 'false'} </h2>
        <Link to="/">Go home</Link>
      </>
    )
  }
}

export default Profile
