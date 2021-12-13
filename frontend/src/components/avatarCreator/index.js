import React, { Component } from 'react'
import { PopUp } from '..'
import styles from './avatarCreator.scss'

class AvatarCreator extends Component {
  canvasSize = 150

  canvas = null

  ctx = null

  features = {
    Faces: 'Faces/Face=Beard Face 1',
    Outfit: 'Outfit/Outfit=Outfit 01',
    Eyes: 'Eyes/Eyes=Angry',
    Mouth: 'Mouth/Mouth=Angry',
    Hair: 'Hair/Hair=Style 01',
    Accessories: 'Accessories/Accessories=Cap'
  }

  componentDidMount() {
    this.drawAllFeatures()
    this.getTotalRatio()
  }

  getTotalRatio = async () => {
    for (const [key, value] of Object.entries(this.features)) {
      console.log(`For ${key}`)

      let ratio = await new Promise(() => {
        let newImg = new Image()
        newImg.src = require(`./features/${ featureName }.svg`)

        newImg.onload = () => {
          resolve()
        }
      })
    }
  }

  drawAllFeatures = () => {
    // Draws all features in order of object key recursively
    this.drawFeature(this.features[Object.keys(this.features)[0]])
  }

  drawFeature = (featureName) => {
    let newImg = new Image()
    newImg.src = require(`./features/${ featureName }.svg`)

    newImg.onload = () => {
      let largestDimensionSize = Math.max(newImg.width, newImg.height)
      let ratio = this.canvasSize / largestDimensionSize

      this.ctx.drawImage(newImg, 0, 0, newImg.width * ratio, newImg.height * ratio)
    }

    let allFeatureNames = Object.keys(this.features)
    let currentFeatureName = featureName.split('/')[0]
    let currentFeatureIndex = allFeatureNames.indexOf(currentFeatureName)
    // console.log(allFeatureNames[currentFeatureIndex + 1])

    if (this.features[allFeatureNames[currentFeatureIndex + 1]])
      this.drawFeature(this.features[allFeatureNames[currentFeatureIndex + 1]])
  }

  render() {
    return (
      <PopUp content={
        { title: 'Avatar Creator' }
      }>
        <canvas
          height={ this.canvasSize }
          width={ this.canvasSize }
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
