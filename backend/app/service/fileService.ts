import multer = require('multer')
import path = require('path')
import { v4 as uuidv4 } from 'uuid'
import im = require('imagemagick')
import fs = require('fs')

const FileType = require('file-type')

class FileService {
    private storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'app/public/temp')
        },
        filename: function (req, file, cb) {
            cb(null, uuidv4() + '.jpg')
        }
    })

    public getUpload (): any {
        const upload = multer({ storage: this.storage })
        return upload
    }

    public async isImage(file: any): Promise<any> {
        const type = await FileType.fromFile(file.path)
        const ext = type.ext
        if(ext !== 'png' && ext !== 'jpg' && ext !== 'gif' && ext !== 'jpeg') {
            return false
        } else {
            return true
        }
    }

    public async convertImage(file: any): Promise<void> {
        im.resize({
            srcData: fs.readFileSync(file.path, 'binary'),
            width:   800
        }, function(err){
            console.log(err)
        })
    }

    public moveImage(oldPath: string, filename: string): string {
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0')
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const yyyy = today.getFullYear()

        let newPath = 'app/public/' + yyyy
        if (!fs.existsSync(newPath)) {
            fs.mkdirSync(newPath)
            fs.mkdirSync(newPath + '/' + mm)
            fs.mkdirSync(newPath + '/' + mm + '/' + dd)
        } else if(!fs.existsSync(newPath + '/' + mm)) {
            fs.mkdirSync(newPath + '/' + mm)
            fs.mkdirSync(newPath + '/' + mm + '/' + dd)
        } else if(!fs.existsSync(newPath + '/' + mm + '/' + dd)) {
            fs.mkdirSync(newPath + '/' + mm + '/' + dd)
        }
        newPath = newPath + '/' + mm + '/' + dd + '/'

        fs.rename(oldPath, newPath + filename, function (err) {
            if (err) throw err
        })
        return newPath + filename
    }

    public deleteImage(fileName: string): void {
        fs.unlink(fileName, function (err) {
            if (err) throw err
        })
    }
}

export default FileService;
