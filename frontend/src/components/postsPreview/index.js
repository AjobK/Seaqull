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
    const { create, posts } = this.props

    let arr = []

    let postsAmountToRender = create ? 7 : 8

    if (posts.length > 8)
      postsAmountToRender = posts.length + (posts.length + (create ? 1 : 0)) % 4

    for (let i = 0; i < postsAmountToRender; i++) {
      arr.push(<PreviewPost post={ posts[i] || {} } key={ i } filler={ i > posts.length - 1 } />)
    }

    return (
      <section className={ styles.wrapper }>
        {create && (
          <Link to="/new-post" className={ styles.add }>
            <Icon prefix={ 'mui' } iconName={ 'Add' } className={ styles.addIcon } />
          </Link>
        )}
        {arr}
      </section>
    )
  }
}

export default PostsPreview
