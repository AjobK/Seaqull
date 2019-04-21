import React from 'react'
import update from 'react-addons-update'; // ES6
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard, Section } from '../../layouts'
import { PostBanner, PostContentHeading, PostContentParagraph, Button } from '../../components'
import styles from './post.scss'

@inject('store') @observer
class Post extends App {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Front-End vs. Back-End',
      content: [
        { type: 'heading', value: 'Welcome to the world' },
        { type: 'paragraph', value: 'This is an awesome paragraph!' },
        { type: 'heading', value: 'Hello and greetings from the earth human' },
        { type: 'paragraph', value: 'Well well, is this a piece of text?' }
      ]
    }
    this.cbKey = 0
  }

  theCallBackFunc = (item) => {
    console.log('CB KEY: ' + item.props.cbKey)
    this.setState({
      content: update(this.state.content, { [item.props.cbKey]: { $set:  { // Cost efficient
        type: item.type,
        value: item.state.value
      } } })
    }, () => { // Async
      this.sendDataToDB()
    })
  }

  sendDataToDB() {
    // Send this data
    console.log(JSON.stringify(this.state.content))
  }

  returnComponentsFromJson(data = null) {
    this.cbKey = 0

    let arr = []
    const content = JSON.parse(data) || this.state.content

    content.forEach((item, counter) => {
      const { type, value } = item

      /*eslint indent: ["error", 2, { "SwitchCase": 1 }]*/
      switch(type) {
        case 'heading':
          arr.push(<PostContentHeading cbKey={this.cbKey} key={counter} theCB={this.theCallBackFunc} value={value} />)
          break;
        case 'paragraph':
          arr.push(<PostContentParagraph cbKey={this.cbKey} key={counter} theCB={this.theCallBackFunc} value={value} />)
          break;
      }

      this.cbKey++
    })

    return arr
  }

  render() {
    const { user } = this.props.store

    return (
      <Standard>
        <PostBanner />
        <Section title={this.state.title} editable>
          {/* <PostContentHeading value={'First text'} theCB={this.theCallBackFunc} cbKey={0} />
          <PostContentHeading value={'Secondary text'} theCB={this.theCallBackFunc} cbKey={1} /> */}
          {this.returnComponentsFromJson()}
        </Section>
        {/* {user.loggedIn && <InsertContent />} */}
        <div className={styles.container}>
          <Button classname={styles.insertButtonTitle} value='TITLE'/>
          <Button value='TEXT' />
          <Button value='IMG' />
        </div>
      </Standard>
    )
  }
}

export default Post
