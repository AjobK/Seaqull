import React from 'react'
import App from '../App'
import { Standard, Section } from '../../layouts'
import { observer, inject } from 'mobx-react'
import { UserBanner, PostsPreview, Statistics } from '../../components'
import Axios from 'axios'

@inject('store') @observer
class Profile extends App {

  componentDidMount() {
    const { uid } = this.props.match.params

    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNiNmRjYTZlYWFmNGUxZGQwNjcxYjM3MmYyNDIyMzU5MTQxNjBlYmUzZmNmNjk5NzhhMzMwMTVmYjViMTYxZjBlZTg5MzQxZGY3MjE4ZDQ5In0.eyJhdWQiOiIxIiwianRpIjoiM2I2ZGNhNmVhYWY0ZTFkZDA2NzFiMzcyZjI0MjIzNTkxNDE2MGViZTNmY2Y2OTk3OGEzMzAxNWZiNWIxNjFmMGVlODkzNDFkZjcyMThkNDkiLCJpYXQiOjE1NTg2OTU2NTksIm5iZiI6MTU1ODY5NTY1OSwiZXhwIjoxNTkwMzE4MDU5LCJzdWIiOiI1MSIsInNjb3BlcyI6W119.n4ge9hjrl5U8Z2hykcHUUh9vMd1deaWPJNKNbkHmY-eSyjzjHox5XZnDMuCdOAERmC8H6fkESU_fx-HTeJsGgnt_L3siStNdUuU4taTlKqNcFjDk_gtcFi2Otk_R1ILCOCRQt7E-0uSfPcIacIvmnJlPW1Lm_rKlku-zkOng-FgRUf6wiJYFg1BrA8M6LHdb4dkohPiUPOnGnVBh17GJemjdC4T1zYf_ZB1g--cBtF7IY5pB5eMT_yvbH9YLOlkN2OgbZ7T6vPDtkUbdEgSuzq2fvBWvCjb8QD2-tPCBcq7FPLjB5T5lrQf6b2NF5i82WIpNn674UkrJgWZV-hJ2HPKnFOHsYJdAcXiAKdSJWhhG4eC6woVnxqt5dct6wJ2bcEDcVEYYjsfNZ1v06fljnCelFGhnVpUS9WHz10UsRqlcjJFVH2IVG0gVNWS3xNoy9OVWeldEfUjs8re9GHk3AtZiWjz8BolEhzLEkLeoRJqH7cx7Xw3Csje8bAzN4nsc1aK_LmumYD3fnKEMcGAXiT4m6RTqL3he9VwAOSiZYRFbpj6GwqhnS6JJ9B0n9ftVZHSyZOdxH8qyhksmWko8iE3_LWX1F6l_8PCykJWfnr5R4OiF3_Y1seJQPD68s-RmSnmm2wtYo8OCeoW07JLVNoBwCxr2EDyxCcIDA-asWdc'

    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }

    Axios.get(`${this.props.store.defaultData.backendUrl}/api/profile/${uid}`, config)
      .then((response) => {
        this.updateProfile(response.data.profile)
      })
  }

  updateProfile(profile) {
    const { user } = this.props.store

    user.setName(profile.name)
    user.setTitle(profile.title)
    user.setLevel(profile.exp || 1)
    user.setEditable(profile.isOwner);
    user.setPosts(profile.posts);
  }

  render() {
    return (
      <Standard>
        <UserBanner />
        <Section title={'CREATED POSTS'}>
          <PostsPreview create/>
        </Section>
        <Section title={'LIKED POSTS'}>
          <PostsPreview />
        </Section>
        <Section title={'STATISTICS'}>
          <Statistics />
        </Section>
      </Standard>
    )
  }
}

export default Profile
