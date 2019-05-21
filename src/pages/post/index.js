import React from 'react'
import update from 'react-addons-update' // ES6
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard, Section } from '../../layouts'
import { PostBanner, PostContent, Button, Title, Icon } from '../../components'
import { convertToRaw, convertFromRaw } from 'draft-js'
import styles from './post.scss'

@inject('store') @observer
class Post extends App {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Front-End vs. Back-End',
      content: JSON.parse(window.localStorage.getItem('content')) || [
        { type: 'heading', value: null },
        { type: 'paragraph', value: null },
        { type: 'heading', value: null },
        { type: 'paragraph', value: null }
      ]
    }
    this.cbKey = 0
  }

  callBackFunc = (item) => {
    console.log('CB KEY: ' + item.props.cbKey)
    this.setState({
      content: update(this.state.content, { [item.props.cbKey]: { $set: { // Cost efficient
        type: item.type,
        value: convertToRaw(item.state.editorState.getCurrentContent())
      } } })
    }, () => { // Async
      this.sendDataToDB()
    })
  }

  sendDataToDB() {
    // Send this data
    window.localStorage.setItem('content', JSON.stringify(this.state.content));
  }

  returnComponentsFromJson(data = null) {
    this.cbKey = 0

    let arr = []
    const content = JSON.parse(data) || this.state.content

    content.forEach((item, counter) => {
      const { type, value } = item

      arr.push(<PostContent key={counter} type={type} callBackFunc={this.callBackFunc} cbKey={this.cbKey} value={value && convertFromRaw(value)} />)

      this.cbKey++
    })

    return arr
  }

  render() {
    return (
      <Standard className={[styles.stdBgWhite]}>
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
