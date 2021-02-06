import React from 'react'
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard, Section } from '../../layouts'
import { PostBanner, PostContent, Icon } from '../../components'
import { convertFromRaw } from 'draft-js'
import styles from './post.scss'
import Axios from 'axios'

@inject('store') @observer
class Post extends App {
  constructor(props) {
    super(props)

    this.state = {
      renderContent: '',
      title: ''
    }
  }

  componentWillMount() {
    const { params } = this.props.match

    console.log(params)

    Axios.get(`${this.props.store.defaultData.backendUrl}/post/${params['postUrl']}`, {
      mode:'cors',
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type':'application/json' }
    })
    .then((response) => {
      this.setState({ renderContent: response.data.data.content })
      this.setState({ title: response.data.data.title })
    })
  }

  render() {
    console.log('renderoo')
    console.log(this.state.title)
    console.log(this.state.renderContent)
    return (
      <Standard className={[styles.stdBgWhite]}>
        <PostBanner userData={[]} />
        <Section noTitle>
          <div className={styles.date}>
            <Icon iconName={'Clock'} className={styles.dateIcon} /> 12 mar 2019
          </div>
          <div className={styles.renderWrapper}>
            <PostContent
              noEdit
              type={'title'}
              value={convertFromRaw({"blocks":[{"key":"2irpb","text":this.state.title,"type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}})}
            />
            <PostContent
              noEdit
              type={'story'}
              value={convertFromRaw({"blocks":[{"key":"2irpx","text":this.state.renderContent,"type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}})}
            />
          </div>
        </Section>
      </Standard>
    )
  }
}

export default Post
