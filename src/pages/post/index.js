import React from 'react'
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

    let content = window.localStorage.getItem('content')

    this.content = content ? JSON.parse(content) : [
      { type: 'heading', value: null },
      { type: 'paragraph', value: null },
      { type: 'heading', value: null },
      { type: 'paragraph', value: null }
    ]
    this.cbKey = 0
    this.state = {
      title: 'Front-End vs. Back-End',
      renderContent: []
    }
  }

  componentDidMount() {
    this.returnComponentsFromJson()
  }

  callBackSaveData = (item) => {
    console.log('Saving data :-)')
    const { editorState } = item.state

    this.content[item.cbKey-1] = {
      type: item.type,
      value: convertToRaw(editorState.getCurrentContent())
    }
    this.sendDataToDB()
  }

  callBackItemRemoval = (item) => {
    const { cbKey } = item.props

    this.content.splice(cbKey-1, 1)
    this.returnComponentsFromJson()
  }

  createContentBlock = (type) => {
    this.content.push({ type: type, value: null })
    this.returnComponentsFromJson()
  }

  returnComponentsFromJson = (noSetState = false) => {
    let contentArr = []

    this.content.forEach((item, counter) => {
      const { type, value } = item

      contentArr.push(
        <PostContent
          key={this.cbKey+counter+1}
          type={type}
          callBackSaveData={this.callBackSaveData}
          callBackItemRemoval={this.callBackItemRemoval}
          cbKey={counter+1}
          value={value ? convertFromRaw(value) : null}
        />)
    })
    
    this.cbKey += contentArr.length

    if (!noSetState) {
      this.setState({
        renderContent: contentArr
      }, () => {
        this.sendDataToDB()
      })
    } else {
      this.sendDataToDB()
    }
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
            <p className={styles.containerText}>INSERT CONTENT </p>
            <Button className={styles.insertButtonHeading} noStyle value='HEADING' onClick={() => this.createContentBlock('heading')}/>
            <Button className={styles.insertButtonParagraph} noStyle value='PARAGRAPH' onClick={() => this.createContentBlock('paragraph')} />
          </div>
        </Section>
        <div className={styles.saveContainer} onClick={this.onClick2}>
          <div className={styles.save}>
            <Button className={styles.saveButton} value='Save Changes'/>
          </div>
        </div>
      </Standard>
    )
  }
}

export default Post
