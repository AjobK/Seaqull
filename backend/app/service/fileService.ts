import { v4 as uuidv4 } from 'uuid'
import im = require('imagemagick')
import fs = require('fs')
import multer = require('multer')
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

class FileService {

    public getUpload (): any {
        const upload = multer({ limits: { fieldSize: 2 * 1024 * 1024 } })
        return upload
    }

    public async isImage(file: any): Promise<any> {
        const ext = file.detectedFileExtension
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return false
        } else {
            return true
        }
    }

    public async convertImage(path: any): Promise<void> {
        im.resize({
            srcData: fs.readFileSync('app/public/' + path, 'binary'),
            width:   800
        }, function(err){
            console.log(err)
        })
    }

    public async storeImage(file: any): Promise<string> {
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
        const name = uuidv4() + file.detectedFileExtension
        newPath = newPath + '/' + mm + '/' + dd + '/' + name
        await pipeline(file.stream, fs.createWriteStream(newPath))
        return yyyy + '/' + mm + '/' + dd + '/' + name
    }

    public deleteImage(path: string): void {
        fs.unlink('app/public/' + path, function (err) {
            if (err) throw err
        })
    }
}

export default FileService;
