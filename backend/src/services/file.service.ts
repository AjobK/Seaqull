import { v4 as uuidv4 } from 'uuid'
import { Injectable } from '@nestjs/common'
import { createWriteStream, existsSync, mkdirSync, unlink } from 'fs'
import { createReadStream } from 'streamifier'

@Injectable()
export class FileService {

  public isImage(file: Express.Multer.File): boolean {
    const mimetype = file.mimetype
    const extensions = ['image/png', 'image/gif', 'image/jpeg']

    return extensions.indexOf(mimetype) != -1
  }

  public async storeImage(file: Express.Multer.File, path: string): Promise<string> {
    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = today.getFullYear()
    const delimitedFile = file.originalname.split('.')
    const extension = delimitedFile[delimitedFile.length - 1]
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
