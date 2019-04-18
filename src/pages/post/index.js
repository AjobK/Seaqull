import React from 'react'
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard, Section } from '../../layouts'
import { PostBanner, PostContentHeading, PostContentParagraph, InsertContent } from '../../components'

@inject('store') @observer
class Post extends App {
  constructor(props) {
    super(props)
  }

  addField(contentBlock) {
    let newBlock = null

    /*eslint indent: ["error", 2, { "SwitchCase": 1 }]*/
    switch (contentBlock.toLowerCase()) {
      case 'heading':
        newBlock = <PostContentHeading />
        break;
      case 'paragraph':
        newBlock = <PostContentParagraph />
        break;
      case 'img':
        newBlock = <PostContentParagraph />
        break;
    }

    if (!newBlock) return

    this.setState({
      contentBlocks: [...this.state.contentBlocks, newBlock]
    })
  }

  getData() {
    this.state.contentBlocks.length
  }

  render() {
    const { user } = this.props.store

    let a = <PostContentHeading value={'Secondary text'}/>
    console.log(a)

    return (
      <Standard>
        <PostBanner />
        <Section title={'Front-End vs. Back-End'} editable>
          {/* { this.state.contentBlocks } */}
          <PostContentHeading value={'Visuals are key'} />
          <br />
          <PostContentParagraph value={'The importance is visuals is in it\'s essence very simple.'} />
          <br />
          <PostContentHeading value={'Understanding color'} />
          <br />
          <PostContentParagraph value={'To be the master of colors, you have to understand how they work.'} />
          <br />
        </Section>
        {user.loggedIn && <InsertContent />}
      </Standard>
    )
  }
}

export default Post
