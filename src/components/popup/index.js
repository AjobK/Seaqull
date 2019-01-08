import React from 'react'
import styles from './popup.scss'
import Icon from '../icon';

class Popup extends React.Component {
  constructor(props){
    super(props)

    this.state = ({ popupOverlayClass: styles.popupOverlayShow })
  }

  componentDidMount() {
    document.addEventListener('click', event => {
      if(event.target.className === styles.popupOverlayShow) {
        this.setState({ popupOverlayClass: styles.popupOverlayHidden })
      }
      if(event.target.className === this.props.target) {
        this.setState({ popupOverlayClass: styles.popupOverlayShow })
      }
    })
  }


  setOverlayColor () {
      return (
      <style jsx>{`
        .${this.styles.popupOverlayShow} {
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
