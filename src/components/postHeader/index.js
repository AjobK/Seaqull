import React, { Component } from 'react'

class PostHeader extends Component {
  render() {
    return (
      <h3> {this.props.match.params.postUrl || 'NONE'} </h3>
    )
  }
}

export default PostHeader