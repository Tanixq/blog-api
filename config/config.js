const { config } = require('dotenv')

config()

module.exports = {
    MONGO_URL: process.env.MONGO_URL || '',
    SERVER_PORT: process.env.PORT,
    REDIS_URL: process.env.REDIS_URL,
    LOG_LEVEL: process.env.LOG_LEVEL,
    NODE_ENV: process.env.NODE_ENV,

    GMAIL_ID: process.env.GMAIL_ID,
    GMAIL_PASS: process.env.GMAIL_PASS,
 
    ENCRYPT_SECRET_KEY: process.env.ENCRYPT_SECRET_KEY
}