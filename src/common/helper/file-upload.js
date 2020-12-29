const fs = require('fs')
const path = require('path')

const uploadSingleFile = (file, fileType, fileName) => {
    return new Promise((resolve, reject) => {
        var oldPath = file.path
        // eslint-disable-next-line no-undef
        var newPath = path.join(__dirname, `../../assets/uploads/${fileType}`) + '/' + `${fileName}.${fileType.split('/')[1]}`
        // var newPath = path.join(__dirname, `../../../../codex/src/assets/uploads/${fileType}`) + '/' + `${fileName}.${file.type.split('/')[1]}`
        var rawData = fs.readFileSync(oldPath)

        fs.writeFile(newPath, rawData, function (err, data) {
            if (err) reject(err)
            resolve(`/assets/uploads/${fileType}/${fileName}.${file.type.split('/')[1]}`)
        })
    })
}

const uploadMultipleFiles = async (files, fileType, fileName) => {
    let uploadedFile = []
    let [i, j] = [0, 0]
    uploadedFile = await Promise.all(
        files.map(async file => {
            var oldPath = file.path
            // eslint-disable-next-line no-undef
            var newPath = path.join(__dirname, `../../assets/uploads/${fileType}`) + '/' + `${fileName}-${i++}.${file.type.split('/')[1]}`
            // var newPath = path.join(__dirname, `../../../../codex/src/assets/uploads/${fileType}`) + '/' + `${fileName}-${i++}.${file.type.split('/')[1]}`
            var rawData = fs.readFileSync(oldPath)
            await fs.writeFile(newPath, rawData, function (err, data) {
                if (err) console.log(err)
            })
            return (`/assets/uploads/${fileType}/${fileName}-${j++}.${file.type.split('/')[1]}`)
        })
    )
    return uploadedFile
}

module.exports = {
    uploadSingleFile,
    uploadMultipleFiles
}
