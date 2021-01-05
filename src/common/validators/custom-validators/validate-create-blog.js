const { isEmpty } = require('lodash')
const { blogCategoryEnum } = require('../../helpers/enum')
const validateCreateBlog = (req, res, next) => {
    let errors = []
    if (isEmpty(req.body.title)) {
        let error = {
            msg: '"title" fleid is missing'
        }
        errors.push(error)
    } else {
        if (req.body.title.length > 60) {
            let error = {
                msg: '"title" fleid is longer than 60 characters'
            }
            errors.push(error)
        }
    }
    if (isEmpty(req.body.content)) {
        let error = {
            msg: '"content" fleid is missing'
        }
        errors.push(error)
    }
    if (isEmpty(req.file)) {
        let error = {
            msg: '"thumbImage" fleid is missing'
        }
        errors.push(error)
    }
    if (blogCategoryEnum.indexOf(req.body.category) === -1) {
        let error = {
            msg: 'invalid category'
        }
        errors.push(error)
    }   
    if (errors.length > 0) {
        res.status(422).send(errors)
    } else {
        next()
    }
}

module.exports = {
    validateCreateBlog
}
