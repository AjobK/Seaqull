import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import Axios from 'axios'
import styles from '../postLikesList/postLikesList.scss'
import { Icon } from '../index'
import ColorUtil from '../../util/colorUtil'
import { Link } from 'react-router-dom'

@inject('store')
@observer
class ProfileFollowerList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      followers: [],
    }
  }

  componentDidMount() {
    this.loadFollowers()
  }

    loadFollowers = () => {
      Axios.get(
        `${this.props.store.defaultData.backendUrl}/profile/${this.props.user.username}/followers`)
        .then((res
        ) => {
          const followers = []

          res.data.followers.forEach((follower) => {
            followers.push({
              displayName: follower.display_name,
              avatarURL: 'http://localhost:8000/' + follower.avatar_attachment.path,
              title: follower.title.name,
            })
          })

          this.setState({
            followers
          })
        })
    }

    render() {
      return (
        <div className={ `${styles.postLikesListWrapper}` }>
          <div className={ `${styles.likesBackground}` } onClick={ this.props.closeFollowersList } />
          <div className={ `${styles.likesListWrapper}` }>
            <div className={ styles.likesListHeader }>
              <div className={ `${styles.likesListTitle}` }>
                <h2>
                  <Icon iconName={ 'UserFriends' } className={ styles.like } /> Followed by{' '}
                </h2>
              </div>
              <Icon
                iconName={ 'TimesCircle' }
                className={ styles.closeLikes }
                onClick={ this.props.closeFollowersList }
              />
            </div>
            <ul className={ `${styles.likesList}` }>
              { this.state.followers.map((follower, index) => {
                const uniqueAvatarColorBasedOnHash = ColorUtil.getUniqueColorBasedOnString(follower.displayName)

                return (
                  <li key={ index } className={ `${styles.likesListItem}` } onClick={ this.props.closeFollowersList }>
                    <Link to={ `/profile/${follower.displayName}` } className={ styles.profileLikeLink }>
                      <div className={ `${styles.profileAvatarWrapper}` }>
                        <div
                          className={ `${styles.avatar}` }
                          style={ {
                            backgroundImage: `url(${follower.avatarURL || ''})`,
                            backgroundColor: uniqueAvatarColorBasedOnHash,
                          } }
                        />
                      </div>
                      <div className={ `${styles.profileTextWrapper}` }>
                        <p className={ `${styles.profileDisplayName}` }> {follower.displayName }</p>
                        <p className={ `${styles.profileTitle}` }>{ follower.title }</p>
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

export default ProfileFollowerList
