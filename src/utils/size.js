// Check size of images.
// At first you need to download images, and after it you can check size of images.

const fs = require('fs')
const path = require('path')
const dir = './images/'

const showFileSize = async () => {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) return reject(err)

            files.forEach(file => {
                const filePath = path.join(dir, file)
                let size = (fs.statSync(filePath).size / 1024 ).toFixed(2)
                
                if (size > 1024) {
                    size = `${size} Мб`
                } else {
                    size = `${size} Кб`
                }
        
                const fileInfo = `${file} - ${size}`
        
                console.log(fileInfo);
            })
            resolve()
        })
    })
}

module.exports = showFileSize