const { config } = require('dotenv')

config()

module.exports = {
    MONGO_URL: process.env.MONGO_URL ,
    REDIS_URL: process.env.REDIS_URL,
    GMAIL_ID: process.env.GMAIL_ID,
    GMAIL_PASS: process.env.GMAIL_PASS
}