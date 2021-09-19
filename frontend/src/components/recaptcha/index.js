import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('store') @observer
class Recaptcha extends Component {
  constructor(props) {
    super(props)

    window.onSubmit = this.onSubmit.bind(this)
    window.hide = this.hide.bind(this)
  }

  componentDidMount() {
    const script = document.createElement('script')
    script.src =
      'https://www.google.com/recaptcha/api.js?render=6Lev1KUUAAAAAKBHldTqZdeR1XdZDLQiOOgMXJ-S&hl=en&onload=hide'
    document.body.appendChild(script)
  }

  hide() {
    const el = document.querySelector('.grecaptcha-badge')
    el.style.display = 'none'

  }

  onSubmit() {
    this.props.setRecaptcha(grecaptcha.getResponse())
  }

  render() {
    return (
      <div
        className='g-recaptcha'
        data-badge='inline'
        data-callback='onSubmit'
        data-sitekey='6Lev1KUUAAAAAKBHldTqZdeR1XdZDLQiOOgMXJ-S'>
      </div>
    )
  }
}
export default Recaptcha
