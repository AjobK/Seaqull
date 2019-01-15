import React from 'react'
import styles from './popup.scss'
import Icon from '../icon';

class Popup extends React.Component {
  constructor(props){
    super(props)

    this.state = ({ popupOverlayClass: styles.popupOverlayHidden, popupOpen: false })
  }

  componentDidMount() {
    const popupTimes = document.getElementsByClassName(styles.popupIconLink)[0]
    const popupOverlay = document.getElementsByClassName(styles.popupOverlayHidden)[0]

    popupOverlay.addEventListener('transitionend', () => {
      if (!this.state.popupOpen) {
        popupOverlay.style.visibility = 'collapse'
      }
    })

    popupTimes.addEventListener('click', e => {
      e.preventDefault()
      this.togglePopup()
    })

    document.addEventListener('click', event => {
      if(event.target.className === styles.popupOverlayShow) {
        this.togglePopup()
      }
      if(event.target.className === this.props.target) {
        this.togglePopup()
      }
    })

    this.openByTime()
  }

  openByTime() {
    if (this.props.time) {
      setTimeout(() => {this.togglePopup()} , this.props.time * 1000)
    }
  }

  togglePopup() {
    if (this.state.popupOpen) {
      this.setState({ popupOverlayClass: styles.popupOverlayHidden, popupOpen: false })
    } else {
      this.setState({ popupOverlayClass: styles.popupOverlayShow, popupOpen: true })
    }
  }

  setOverlayColor () {
      return (
      <style jsx>{`
        .${styles.popupOverlayShow} {
          background-color: ${this.props.overlayColor}
        }
      `}
      </style>
    )
  }

  render () {
    return (
      <>
        <div className={this.state.popupOverlayClass}>
          <div className={styles.popupHolder}>
            <a href='' className={styles.popupIconLink}>
              <Icon className={styles.popupIcon} iconName='faTimes' />
            </a>
            {this.props.children}
          </div>
        </div>
        {this.props.overlayColor && this.setOverlayColor}
      </>
    )
  }
}

export default Popup
