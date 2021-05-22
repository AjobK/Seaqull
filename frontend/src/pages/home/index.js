import React from 'react'
import App from '../App'
import { Standard, Main } from '../../layouts'
import PostsBlock from "../../components/postsBlock";

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
