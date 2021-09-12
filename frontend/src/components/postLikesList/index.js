import React, { Component } from 'react'
import styles from './postLikesList.scss'
import { inject, observer } from 'mobx-react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { Icon } from '../../components'
import ColorUtil from '../../util/colorUtil'
import URLUtil from '../../util/urlUtil'

@inject('store')
@observer
class PostLikesList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      likes: [],
    }
  }

  componentDidMount() {
    this.loadLikes()
  }

  loadLikes = () => {
    const path = URLUtil.getLastPathArgument()

    Axios.get(`${this.props.store.defaultData.backendUrl}/post/like/${path}`).then((res) => {
      const likes = []

      res.data.forEach((like) => {
        const userLike = {
          displayName: like.profile.display_name,
          avatarURL: 'http://localhost:8000/' + like.profile.avatar_attachment.path,
          title: like.profile.title.name,
        }

        likes.push(userLike)
      })

      this.setState({
        likes,
      })
    })
  }

  render() {
    return (
      <div className={`${styles.postLikesListWrapper}`}>
        <div className={`${styles.likesBackground}`} onClick={this.props.closeLikesList} />
        <div className={`${styles.likesListWrapper}`}>
          <div className={styles.likesListHeader}>
            <div className={`${styles.likesListTitle}`}>
              <h2>
                <Icon iconName={'Heart'} className={styles.like} /> Liked by{' '}
              </h2>
            </div>
            <Icon iconName={'TimesCircle'} className={styles.closeLikes} onClick={this.props.closeLikesList} />
          </div>
          <ul className={`${styles.likesList}`}>
            {this.state.likes.map((like, index) => {
              const uniqueAvatarColorBasedOnHash = ColorUtil.getUniqueColorBasedOnString(like.displayName)

              return (
                <li key={index} className={`${styles.likesListItem}`}>
                  <Link to={`/profile/${like.displayName}`} className={styles.profileLikeLink}>
                    <div className={`${styles.profileAvatarWrapper}`}>
                      <div
                        className={`${styles.avatar}`}
                        style={{
                          backgroundImage: `url(${like.avatarURL || ''})`,
                          backgroundColor: uniqueAvatarColorBasedOnHash,
                        }}
                      />
                    </div>
                    <div className={`${styles.profileTextWrapper}`}>
                      <p className={`${styles.profileDisplayName}`}>{like.displayName}</p>
                      <p className={`${styles.profileTitle}`}>{like.title}</p>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default PostLikesList
