import React, { Component } from 'react'
import styles from './postsPreview.scss'
import Plus from '../../static/icons/plus.svg'
import { PreviewPost } from '../../components'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

@inject('store')
@observer
class PostsPreview extends Component {
  render() {
    const posts = this.props.posts

    let arr = []

    for (let i = 0; i < (posts.length > 9 ? posts.length : 9); i++) {
      arr.push(<PreviewPost post={ posts[i] || {} } key={ i } />)
    }

    return (
      <section className={ styles.wrapper }>
        { this.props.create && (
          <Link to="/new-post" className={ styles.add }>
            <img className={ styles.addIcon } src={ Plus } draggable={ false } />
          </Link>
        ) }
        { arr }
        <div className={ `${styles.article} ${styles.fillerMobile}` } />
      </section>
    )
  }
}

export default PostsPreview
