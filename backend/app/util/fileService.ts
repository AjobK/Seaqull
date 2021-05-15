import { v4 as uuidv4 } from 'uuid'
import fs = require('fs')
import multer = require('multer')

const { promisify } = require('util')
const pipeline = promisify(require('stream').pipeline)
const sharp = require('sharp');

class FileService {

    public getUpload (): any {
        const upload = multer({ limits: { fieldSize: 2 * 1024 * 1024 } })

        return upload
    }

    public async isImage (file: any): Promise<any> {
        const ext = file.detectedFileExtension

        return !(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg')
    }

    public async convertImage (path: any): Promise<void> {
        sharp(path).resize(800)
    }

    public async storeImage (file: any): Promise<string> {
        const today = new Date()
        const day = String(today.getDate()).padStart(2, '0')
        const month = String(today.getMonth() + 1).padStart(2, '0')
        const year = today.getFullYear()
        const name = uuidv4() + file.detectedFileExtension
        let newPath = 'app/public/profile/' + year

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
        return 'profile/' + year + '/' + month + '/' + day + '/' + name
    }

    public deleteImage (path: string): void {
        fs.unlink('app/public/' + path, function (err) {
            if (err) throw err
        })
    }
}

export default FileService
