import React from 'react'
import update from 'react-addons-update' // ES6
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard, Section } from '../../layouts'
import { PostBanner, PostContent, Button, Title, Icon } from '../../components'
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
    this.setState({
      content: update(this.state.content, { [item.props.cbKey]: { $set: { // Cost efficient
        type: item.type,
        value: item.state.value
      } } })
    }, () => { // Async
      this.sendDataToDB()
    })
  }

  sendDataToDB() {
    // Send this data
  }

  returnComponentsFromJson(data = null) {
    this.cbKey = 0

    let arr = []
    const content = JSON.parse(data) || this.state.content

    content.forEach((item, counter) => {
      const { type, value } = item

      arr.push(<PostContent cbKey={this.cbKey} key={counter} theCB={this.theCallBackFunc} value={value} type={type} />)

      this.cbKey++
    })

    return arr
  }

  render() {
    return (
      <Standard>
        <PostBanner />
        <Section title={this.state.title} editable>
          {this.returnComponentsFromJson()}
        </Section>
        <Title classname={styles.title} center value='INSERT CONTENT'/>
        <div className={styles.container}>
          <Button className={styles.insertButtonTitle} value='TITLE'/>
          <Button className={styles.insertButtonText} value='TEXT' />
          <Button className={styles.insertButtonImg} value='IMG' />
        </div>
        <div className={styles.saveContainer}>
          <div className={styles.save}>
            <Button className={styles.saveButton} value='Save Changes'/>
            <div className={styles.insertButtonEye}><Icon iconName={'Eye'}/></div>
          </div>
        </div>
      </Standard>
    )
  }
}

export default Post
