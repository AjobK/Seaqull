import React from 'react'
import App from '../App'
import { Standard, Section } from '../../layouts'
import { observer, inject } from 'mobx-react'
import { UserBanner, PostsPreview, Statistics } from '../../components'
import Axios from 'axios'

@inject('store') @observer
class Profile extends App {

  constructor(props) {
    super(props);

    const user = {
      isOwner: false,
      name: '',
      title: '',
      level: 0,
      posts: [],
      banner: '/src/static/dummy/user/banner.jpg',
      picture: '/src/static/dummy/user/profile.jpg'
    }

    this.state = {
      user: user
    }
  }

  componentDidMount() {
    const { path } = this.props.match.params
    const { user } = this.props.store

    if(user.path === path) {
      this.updateProfile(user);
    }
    else {
      this.fetchProfileData(path);
    }
  }

  fetchProfileData(path) {
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNiNmRjYTZlYWFmNGUxZGQwNjcxYjM3MmYyNDIyMzU5MTQxNjBlYmUzZmNmNjk5NzhhMzMwMTVmYjViMTYxZjBlZTg5MzQxZGY3MjE4ZDQ5In0.eyJhdWQiOiIxIiwianRpIjoiM2I2ZGNhNmVhYWY0ZTFkZDA2NzFiMzcyZjI0MjIzNTkxNDE2MGViZTNmY2Y2OTk3OGEzMzAxNWZiNWIxNjFmMGVlODkzNDFkZjcyMThkNDkiLCJpYXQiOjE1NTg2OTU2NTksIm5iZiI6MTU1ODY5NTY1OSwiZXhwIjoxNTkwMzE4MDU5LCJzdWIiOiI1MSIsInNjb3BlcyI6W119.n4ge9hjrl5U8Z2hykcHUUh9vMd1deaWPJNKNbkHmY-eSyjzjHox5XZnDMuCdOAERmC8H6fkESU_fx-HTeJsGgnt_L3siStNdUuU4taTlKqNcFjDk_gtcFi2Otk_R1ILCOCRQt7E-0uSfPcIacIvmnJlPW1Lm_rKlku-zkOng-FgRUf6wiJYFg1BrA8M6LHdb4dkohPiUPOnGnVBh17GJemjdC4T1zYf_ZB1g--cBtF7IY5pB5eMT_yvbH9YLOlkN2OgbZ7T6vPDtkUbdEgSuzq2fvBWvCjb8QD2-tPCBcq7FPLjB5T5lrQf6b2NF5i82WIpNn674UkrJgWZV-hJ2HPKnFOHsYJdAcXiAKdSJWhhG4eC6woVnxqt5dct6wJ2bcEDcVEYYjsfNZ1v06fljnCelFGhnVpUS9WHz10UsRqlcjJFVH2IVG0gVNWS3xNoy9OVWeldEfUjs8re9GHk3AtZiWjz8BolEhzLEkLeoRJqH7cx7Xw3Csje8bAzN4nsc1aK_LmumYD3fnKEMcGAXiT4m6RTqL3he9VwAOSiZYRFbpj6GwqhnS6JJ9B0n9ftVZHSyZOdxH8qyhksmWko8iE3_LWX1F6l_8PCykJWfnr5R4OiF3_Y1seJQPD68s-RmSnmm2wtYo8OCeoW07JLVNoBwCxr2EDyxCcIDA-asWdc'

    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }

    Axios.get(`${this.props.store.defaultData.backendUrl}/api/profile/${path}`, config)
      .then((response) => {
        this.updateProfile(response.data.profile)
      })
  }

  calcLevel(cXp) {
    let xp = {
      current: cXp,
      base: 20,
      max: 20
    }

    let level = 1

    for (let i = 1; xp.current > xp.max; i++) {
      xp.current -= xp.max
      xp.max = ~~(xp.max * 1.2)
      level++
    }

    return level
  }

  updateProfile(profile) {
    const user = {
      isOwner: profile.isOwner,
      name: profile.name,
      title: profile.title,
      level: this.calcLevel(profile.experience),
      posts: profile.posts,
      banner: '/src/static/dummy/user/banner.jpg',
      picture: '/src/static/dummy/user/profile.jpg'
    }

    this.setState({ user })
  }

  render() {
    return (
      <Standard>
        <UserBanner user={this.state.user}/>
        <Section title={'CREATED POSTS'}>
          <PostsPreview posts={this.state.user.posts} create={this.state.user.isOwner} />
        </Section>
        <Section title={'LIKED POSTS'}>
          <PostsPreview posts={this.state.user.posts} />
        </Section>
        <Section title={'STATISTICS'}>
          <Statistics />
        </Section>
      </Standard>
    )
  }
}

export default Profile
