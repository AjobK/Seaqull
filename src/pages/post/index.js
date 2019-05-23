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
    this.setState({
      content: update(this.state.content, { [item.props.cbKey]: { $set: { // Cost efficient
        type: item.type,
        value: convertToRaw(item.state.editorState.getCurrentContent())
      } } })
    }, () => { // Async
      this.sendDataToDB()
    })
  }

  callBackItemRemoval = (item) => {
    let content = this.state.content
    delete content[item.props.cbKey]
    this.setState({ content: content }, () => { // Async
      console.log(this.state.content)
      this.sendDataToDB()
    })
  }

  sendDataToDB() {
    // Send this data
    window.localStorage.setItem('content', JSON.stringify(this.state.content));
  }

  createContentBlock(type) {
    const newContent = this.state.content
    newContent[this.cbKey] = { type: type, value: null }
    this.cbKey++
    this.setState({
      content: newContent
    })
  }

  returnComponentsFromJson(data = null) {
    this.cbKey = 0

    let arr = []
    const content = JSON.parse(data) || this.state.content

    content.forEach((item, counter) => {
      if (!item) return
      const { type, value } = item

      arr.push(<PostContent key={counter} type={type} callBackFunc={this.callBackFunc} callBackItemRemoval={this.callBackItemRemoval} cbKey={this.cbKey} value={value && convertFromRaw(value)} />)

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
          <div className={styles.container}>
            <Button className={styles.insertButtonHeading} noStyle value='HEADING' onClick={() => this.createContentBlock('heading')}/>
            <Button className={styles.insertButtonParagraph} noStyle value='PARAGRAPH' onClick={() => this.createContentBlock('paragraph')} />
            <Button className={styles.insertButtonCode} noStyle value='CODE' onClick={() => this.createContentBlock('code')} />
            <Button className={styles.insertButtonImg} noStyle value='IMAGE' onClick={() => this.createContentBlock('image')} />
          </div>
        </Section>
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
