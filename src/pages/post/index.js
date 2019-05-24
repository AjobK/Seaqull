import React from 'react'
import update from 'react-addons-update' // ES6
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard, Section } from '../../layouts'
import { PostBanner, PostContent, Button, Icon } from '../../components'
import { convertToRaw, convertFromRaw } from 'draft-js'
import styles from './post.scss'

@inject('store') @observer
class Post extends App {
  constructor(props) {
    super(props)
    this.content = JSON.parse(window.localStorage.getItem('content')) || [
      { type: 'heading', value: null },
      { type: 'paragraph', value: null },
      { type: 'heading', value: null },
      { type: 'paragraph', value: null }
    ]
    this.state = {
      title: 'Front-End vs. Back-End',
      renderContent: this.returnComponentsFromJson(true)
    }
  }

  // callBackSaveData = (item) => {
  //   this.setState({
  //     content: update(this.state.content, { [item.props.cbKey]: { $set: { // Cost efficient
  //       type: item.type,
  //       value: convertToRaw(item.state.editorState.getCurrentContent())
  //     } } })
  //   }, () => { // Async
  //     this.sendDataToDB()
  //   })
  // }

  callBackSaveData = (item) => {
    console.log('Saving')
    this.content[item.props.cbKey] = { type: item.type, value: convertToRaw(item.state.editorState.getCurrentContent())}
    this.returnComponentsFromJson()
  }

  callBackItemRemoval = (item) => {
    console.log('Removal')
    this.content.splice(item.props.cbKey, 1)
    this.returnComponentsFromJson()
  }

  createContentBlock = (type) => {
    console.log('Creation')
    this.content.push({ type: type, value: null })
    this.returnComponentsFromJson()
  }

  returnComponentsFromJson = (noSetState = false, noSendDB = false) => {
    let contentArr = []

    this.content.forEach((item, counter) => {
      const { type, value } = item

      contentArr.push(<PostContent key={counter} val={counter} type={type} callBackSaveData={this.callBackSaveData} callBackItemRemoval={this.callBackItemRemoval} cbKey={counter} value={value && convertFromRaw(value)} />)
    })
    
    if (noSetState) return

    this.setState({
      renderContent: contentArr
    }, () => {
      this.sendDataToDB()
    })
  }

  sendDataToDB() {
    // Send this data
    window.localStorage.setItem('content', JSON.stringify(this.content));
  }

  render() {
    return (
      <Standard className={[styles.stdBgWhite]}>
        <PostBanner />
        <Section title={this.state.title} editable>
          { this.state.renderContent }
          <div className={styles.container}>
            <Button className={styles.insertButtonHeading} noStyle value='HEADING' onClick={() => this.createContentBlock('heading')}/>
            <Button className={styles.insertButtonParagraph} noStyle value='PARAGRAPH' onClick={() => this.createContentBlock('paragraph')} />
            <Button className={styles.insertButtonCode} noStyle value='CODE' onClick={() => this.createContentBlock('code')} />
            <Button className={styles.insertButtonImg} noStyle value='IMAGE' onClick={() => this.createContentBlock('image')} />
          </div>
        </Section>
        <div className={styles.saveContainer} onClick={this.onClick2}>
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
