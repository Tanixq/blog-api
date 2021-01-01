'use strict'
var formidable = require('formidable')

const parseBody = (req, res, next) => {
    let fileArray = []
    const form = formidable()
    form.on('file', function (field, file) {
        fileArray.push(file)
    })
    req.file = fileArray
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err)
            return
        }
        for (let key in fields) {
            req.body[key] = fields[key]
        }
        next()
    })
}

module.exports = {
    parseBody
}
