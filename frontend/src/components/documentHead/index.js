import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

class DocumentHead extends Component {
  render() {
    const { title, description, image } = this.props
    const url = window.location.href

    return (
      <Helmet>
        <title>{ title }</title>
        <meta property="og:title" content={ title }/>
        <meta property="og:type" content="website" />
        <meta property="og:url" content={ url } />
        { image && (
          <meta property="og:image" content={ image } />
        ) }
        <meta property="og:description" content={ description } />
        <meta name="theme-color" content="#FF4040"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={ url }/>
        <meta property="twitter:title" content={ title }/>
        <meta property="twitter:description" content={ description }/>
      </Helmet>
    )
  }
}

export default DocumentHead
