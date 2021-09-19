import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import VisibilitySensor from 'react-visibility-sensor'
import styles from './section.scss'
import { Title, PostContentBlock } from '../../components'

@inject('store') @observer
class Section extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleClass: null,
      sensorActive: true
    }
  }

  onChange = (e) => {
    if (e) {
      this.setState({
        visibleClass: styles.visible,
        sensorActive: false
      })
    }
  }

  render() {
    const { title, children, editable, noTitle, className } = this.props

    return (
      <VisibilitySensor
        minTopValue={ window.innerHeight * 0.2 }
        partialVisibility
        onChange={ this.onChange }
        active={ this.state.sensorActive }
      >
        <section className={ `${styles.wrapper} ${this.state.visibleClass} ${className || ''}` }>
          { editable && (
            <PostContentBlock heading={ 'title' }>
              <Title value={ title } />
            </PostContentBlock>)
          }
          {!noTitle && <Title value={ title } center />}
          <div className={ styles.content }>
            { children }
          </div>
        </section>
      </VisibilitySensor>
    )
  }
}

export default Section
