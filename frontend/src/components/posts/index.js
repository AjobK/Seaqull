import React, { Component, lazy, Suspense } from 'react'
import { inject, observer } from 'mobx-react'
import Axios from 'axios'
import { Loader } from '../../components'
import styles from './posts.scss'
const PostsBlock = lazy(() => import('../../components/postsBlock'))

@inject('store')
@observer
class Posts extends Component {
  constructor(props) {
    super(props)

    this.MAX_POSTS_IN_BLOCK = 6
    this.totalPages = null
    this.scrolling = false

    this.state = {
      postsBlocks: [],
      isFetching: false,
      page: 0,
      endReached: false,
    }
  }

  componentDidMount() {
    this.fetchPosts()
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  fetchPosts = () => {
    this.setIsFetching(true)

    Axios.get(`${ this.props.store.defaultData.backendUrl }/post/?page=${ this.state.page }`, { withCredentials: true })
      .then((response) => response.data)
      .then((json) => {
        this.setIsFetching(false)

        this.setCurrentPage(this.state.page + 1)

        this.renderNewPosts(json.posts || [])

        if (json.posts.length < json.per_page) {
          this.setEndReached(true)
        }

        if (this.state.postsBlocks.length <= 1) {
          return this.fetchPosts()
        }

        this.handleScroll()
      })
      .catch((_err) => {
        this.setIsFetching(false)
      })
  }

  setEndReached(endReached) {
    this.setState({
      endReached
    })
  }

  setIsFetching = (isFetching) => {
    this.setState({
      isFetching
    })
  }

  setCurrentPage = (page) => {
    this.setState({
      page
    })
  }

  fetchMorePosts = () => {
    if (this.state.endReached) {
      this.setCurrentPage(0)
      this.setEndReached(false)
      this.fetchPosts()

      return
    }

    this.fetchPosts()
  }

  handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight ||
      this.state.isFetching
    ) {
      return
    }

    this.fetchMorePosts()
  }

  renderNewPosts = (posts) => {
    let postsBlocks = this.state.postsBlocks

    const postsInLastPostsBlock = this.findPostsInPostsBlock(postsBlocks.at(-1))

    if (postsInLastPostsBlock.length <= 0 || postsInLastPostsBlock.length >= this.MAX_POSTS_IN_BLOCK) {
      return this.renderNewPostsBlock(posts)
    }

    this.renderNewPostsAtLastPostsBlock(postsInLastPostsBlock, posts)
  }

  findPostsInPostsBlock(postsBlock) {
    let currentElement = postsBlock

    if (!postsBlock)
      return []

    while (currentElement?.props?.children) {
      const { children } = currentElement.props
      currentElement = children || []
    }

    return currentElement.props.posts
  }

  renderNewPostsAtLastPostsBlock(lastPostBlockPosts, newPosts) {
    const postsAmountToAddToLastPostsBlock = this.MAX_POSTS_IN_BLOCK - lastPostBlockPosts.length

    const postsToAddToLastPostsBlock = newPosts.slice(0, postsAmountToAddToLastPostsBlock)
    const remainingPosts = newPosts.slice(postsAmountToAddToLastPostsBlock)

    const filledLastPostsBlockPosts = lastPostBlockPosts.concat(postsToAddToLastPostsBlock)

    this.state.postsBlocks.pop()
    this.renderNewPostsBlock(filledLastPostsBlockPosts)

    if (remainingPosts.length > 0) {
      this.renderNewPostsBlock(remainingPosts)
    }
  }

  renderNewPostsBlock(posts) {
    const { postsBlocks } = this.state

    const amountOfPostBlocks = Math.ceil(posts.length / this.MAX_POSTS_IN_BLOCK)

    for (let i = 0; i < amountOfPostBlocks; i++) {
      const postsInPostsBlock = posts.slice(
        this.MAX_POSTS_IN_BLOCK * i,
        this.MAX_POSTS_IN_BLOCK * (i + 1)
      )

      postsBlocks.push(this.createPostsBlock(postsInPostsBlock))
    }

    this.setState({
      postsBlocks
    })
  }

  createPostsBlock = (posts) => {
    return (
      <div key={ Math.random() }>
        <Suspense fallback={ <div>Loading...</div> }>
          <PostsBlock posts={ posts } />
        </Suspense>
      </div>
    )
  }

  render() {
    const { postsBlocks } = this.state

    return (
      <div>
        <ul className={ styles.posts }>{ postsBlocks }</ul>
        { this.state.isFetching && <Loader /> }
      </div>
    )
  }
}

export default Posts
