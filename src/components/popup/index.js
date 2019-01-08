import React from 'react'
import styles from './popup.scss'
import Icon from '../icon';

class Popup extends React.Component {
  componentDidMount() {
    const target = styles.popupIcon
    document.addEventListener('click', () => {
      console.log('test klik')
    })
  }


  setOverlayColor () {
      return (
      <style jsx>{`
        .${styles.popupOverlay} {
          background-color: ${this.props.overlayColor}
        }
      `}
      </style>
    )
  }

  render () {
    return (
      <>
        <div className={styles.popupOverlay}>
          <div className={styles.popupHolder}>
            <Icon className={styles.popupIcon} iconName='faTimes' />
            {this.props.children}
          </div>
        </div>
        {this.props.overlayColor && this.setOverlayColor()}
      </>
    )
  }
}

export default Popup
