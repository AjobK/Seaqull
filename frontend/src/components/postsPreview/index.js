import React, { Component } from 'react'
import styles from './postsPreview.scss'
import { PreviewPost } from '../../components'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Icon } from '../../components'

@inject('store')
@observer
class PostsPreview extends Component {
  render() {
    const posts = this.props.posts

    console.log(posts)

    let arr = []

    for (let i = 0; i < (posts.length < 9 ? 9 : posts.length); i++) {
      arr.push(<PreviewPost post={ posts[i] || {} } key={ i } filler={ i > posts.length - 1 } />)
    }

    return (
      <section className={ styles.wrapper }>
        {this.props.create && (
          <Link to="/new-post" className={ styles.add }>
            <Icon prefix={ 'mui' } iconName={ 'Add' } className={ styles.addIcon } />
          </Link>
        )}
        {arr}
        <div className={ `${styles.article} ${styles.fillerMobile}` } />
      </section>
    )
  }
}

export default PostsPreview
