import { v4 as uuidv4 } from 'uuid'
import * as fs from 'fs'
import { Injectable } from '@nestjs/common'

const { promisify } = require('util')
const pipeline = promisify(require('stream').pipeline)

const sharp = require('sharp')

@Injectable()
export class FileService {

  public isImage(file: Express.Multer.File): boolean {
    const mimetype = file.mimetype
    const extensions = ['image/png', 'image/gif', 'image/jpeg']

    return extensions.indexOf(mimetype) != -1
  }

  public async convertImage(path: string, dimensions: Record<number, number>): Promise<void> {
    sharp(path).resize(dimensions)
  }

  public async storeImage(file: Express.Multer.File, path: string): Promise<string> {
    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = today.getFullYear()
    const name = uuidv4() + file.mimetype
    let newPath = 'src/public/' + path + '/' + year

    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath)
      fs.mkdirSync(newPath + '/' + month)
      fs.mkdirSync(newPath + '/' + month + '/' + day)
    } else if (!fs.existsSync(newPath + '/' + month)) {
      fs.mkdirSync(newPath + '/' + month)
      fs.mkdirSync(newPath + '/' + month + '/' + day)
    } else if (!fs.existsSync(newPath + '/' + month + '/' + day)) {
      fs.mkdirSync(newPath + '/' + month + '/' + day)
    }

    newPath = newPath + '/' + month + '/' + day + '/' + name
    await pipeline(file.stream, fs.createWriteStream(newPath))

    return path + '/' + year + '/' + month + '/' + day + '/' + name
  }

  public deleteImage(path: string): void {
    fs.unlink('app/public/' + path, function (err) {
      if (err) throw err
    })
  }
}
