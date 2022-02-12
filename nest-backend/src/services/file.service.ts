import { v4 as uuidv4 } from 'uuid'
import { Injectable } from '@nestjs/common'
import { createWriteStream, existsSync, mkdirSync, unlink } from 'fs'
import { createReadStream } from 'streamifier'
import { createCanvas, loadImage } from 'canvas'
import { Blob } from 'buffer'

const sharp = require('sharp')

@Injectable()
export class FileService {

  public isImage(file: Express.Multer.File): boolean {
    const mimetype = file.mimetype
    const extensions = ['image/png', 'image/gif', 'image/jpeg']

    return extensions.indexOf(mimetype) != -1
  }

  public async convertImage(path: string, dimensions: { width: number, height: number }): Promise<any> {
    const canvas = createCanvas(dimensions.width, dimensions.height)
    const ctx = canvas.getContext('2d')

    const avatar = await loadImage('https://i.pinimg.com/originals/cd/a9/7d/cda97d0ff87d9c7dd7c77f5973d773c4.png')
    ctx.drawImage(avatar, 0, 0)

    ctx.fillStyle = 'rgba(255, 255, 255, 1)'
    console.log(1)

    // const out = fs.createWriteStream(__dirname + '/test.png')
    // const stream = canvas.createPNGStream()
    // out.write()

    // const buffer = canvas.toBuffer('image/png')
    // fs.writeFileSync('./test.png', buffer)

    const img = canvas.toDataURL()

    return this.dataURItoBlob(img)
  }

  dataURItoBlob(dataURI: string): Blob {
    let byteString

    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1])
    }
    else {
      byteString = unescape(dataURI.split(',')[1])
    }

    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    const ia = new Uint8Array(byteString.length)

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    return new Blob([ia], { type:mimeString })
  }

  public async storeImage(file: Express.Multer.File, path: string): Promise<string> {
    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = today.getFullYear()
    // const delimitedFile = file.originalname.split('.')
    const extension = 'png'
    const name = uuidv4() + `.${ extension }`
    let newPath = 'src/public/' + path + '/' + year

    if (!existsSync(newPath)) {
      mkdirSync(newPath)
      mkdirSync(newPath + '/' + month)
      mkdirSync(newPath + '/' + month + '/' + day)
    } else if (!existsSync(newPath + '/' + month)) {
      mkdirSync(newPath + '/' + month)
      mkdirSync(newPath + '/' + month + '/' + day)
    } else if (!existsSync(newPath + '/' + month + '/' + day)) {
      mkdirSync(newPath + '/' + month + '/' + day)
    }

    newPath = newPath + '/' + month + '/' + day + '/' + name

    const writeStream = createWriteStream(newPath)
    createReadStream(file.buffer).pipe(writeStream)

    return path + '/' + year + '/' + month + '/' + day + '/' + name
  }

  public deleteImage(path: string): void {
    unlink('src/public/' + path, function (err) {
      if (err) throw err
    })
  }
}
