import React from 'react'
import update from 'react-addons-update'; // ES6
import App from '../App'
import { observer, inject } from 'mobx-react'
import { Standard, Section } from '../../layouts'
import { PostBanner, PostContentHeading, PostContentParagraph, InsertContent } from '../../components'

@inject('store') @observer
class Post extends App {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Front-End vs. Back-End',
      content: ['','']
    }
    this.cbKey = 0
  }

  theCallBackFunc = (item) => {
    console.log(item.props.cbKey)
    this.setState({
      content: update(this.state.content, { [item.props.cbKey]: { $set:  item.state.value } })
    })

    console.log(this.state.content)
  }

  render() {
    const { user } = this.props.store

    return (
      <Standard>
        <PostBanner />
        <Section title={this.state.title} editable>
          {/* <PostContentHeading value={'Visuals are key'} />
          <br />
          <PostContentParagraph value={'The importance is visuals is in it\'s essence very simple.'} />
          <br />
          <PostContentHeading value={'Understanding color'} />
          <br />
          <PostContentParagraph value={'To be the master of colors, you have to understand how they work.'} />
          <br /> */}
          <PostContentHeading value={'First text'} theCB={this.theCallBackFunc} cbKey={0} />
          <PostContentHeading value={'Secondary text'} theCB={this.theCallBackFunc} cbKey={1} />
        </Section>
        {user.loggedIn && <InsertContent />}
      </Standard>
    )
  }
}

export default Post
