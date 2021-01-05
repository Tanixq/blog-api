const mongoose = require('mongoose')

const { MONGO_URL } = require('../config/config')

const mongoConnect = () => {
    // eslint-disable-next-line no-unused-vars
    const db = mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        .then(() => {
            console.log('Database connected succesfully !')
        })
        .catch(() => {
            console.log('Connection to Database Failed !')
        })
}

module.exports = mongoConnect()
