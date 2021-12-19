import React, { Component } from 'react'
import { PopUp } from '..'
import styles from './avatarCreator.scss'

class AvatarCreator extends Component {
  canvasDimensions = [280, 280]

  canvas = null

  ctx = null

  features = {
    Faces: {
      path: 'Faces/Faces (3)',
      position: {
        x: this.canvasDimensions[0] * 0.168,
        y: this.canvasDimensions[1] * 0.1947
      },
    },
    Outfit: {
      path: 'Outfit/Outfit (2)',
      position: {
        x: this.canvasDimensions[0] * 0.047,
        y: this.canvasDimensions[1] * 0.64
      },
    },
    // Eyes: {
    //   path: 'Eyes/Eyes=Angry',
    //   position: {
    //     x: 0,
    //     y: 0
    //   },
    // },
    // Mouth: {
    //   path: 'Mouth/Mouth=Angry',
    //   position: {
    //     x: 0,
    //     y: 0
    //   },
    // },
    // Hair: {
    //   path: 'Hair/Hair=Style 01',
    //   position: {
    //     x: 0,
    //     y: 0
    //   },
    // },
    // Accessories: {
    //   path: 'Accessories/Accessories=Cap',
    //   position: {
    //     x: 0,
    //     y: 0
    //   }
    // }
  }

  componentDidMount() {
    this.drawAllFeatures()
    // this.getTotalRatio()
  }

  getTotalRatio = async () => {
    let bestRatio

    for (const [key, value] of Object.entries(this.features)) {
      console.log(`For ${key}`)

      let ratio = await new Promise(() => {
        let newImg = new Image()
        newImg.src = require(`./features/${ feature }.svg`)

        newImg.onload = () => {
          resolve(this.canvasDimensions[0] / img.width)
        }
      })
    }
  }

  drawAllFeatures = () => {
    // Draws all features in order of object key recursively
    this.drawFeature(this.features[Object.keys(this.features)[0]])
  }

  drawFeature = (feature) => {
    let newImg = new Image()
    newImg.src = require(`./features/${ feature.path }.svg`)

    newImg.onload = () => {
      // let largestDimensionSize = Math.max(newImg.width, newImg.height)
      // let ratio = 1
      // let newWidth = newImg.width * ratio
      // let newHeight = newImg.height * ratio

      this.ctx.drawImage(
        newImg,
        feature.position.x - 15,
        feature.position.y - 5,
        newImg.width,
        newImg.height
      )
    }

    let allFeatures = Object.keys(this.features)
    let currentFeature = feature.path.split('/')[0]
    let currentFeatureIndex = allFeatures.indexOf(currentFeature)
    // console.log(allFeatures[currentFeatureIndex + 1])

    if (this.features[allFeatures[currentFeatureIndex + 1]])
      this.drawFeature(this.features[allFeatures[currentFeatureIndex + 1]])
  }

  render() {
    return (
      <PopUp content={
        { title: 'Avatar Creator' }
      }>
        <canvas
          width={ this.canvasDimensions[0] }
          height={ this.canvasDimensions[1] }
          className={ styles.avatarRender }
          ref={ (c) => {
            this.canvas = c
            this.ctx = c.getContext('2d')
          } }
        >
          Your browser does not support HTML5.
        </canvas>
      </PopUp>
    )
  }
}

export default AvatarCreator
