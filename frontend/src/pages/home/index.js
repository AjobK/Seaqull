import React from 'react'
import App from '../App'
import { Standard } from '../../layouts'
import { PostsBlock } from '../../components'

class Home extends App {
  render() {
    return (
      <Standard>
        <PostsBlock />
      </Standard>
    )
  }
}

export default Home
