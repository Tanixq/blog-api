const Promise = require('bluebird')
const redis = Promise.promisifyAll(require('redis'))
const { REDIS_URL } = require('../../../config/config')
const redisClient = redis.createClient(REDIS_URL)

redisClient.on('connect', () => {
    console.log('Client connected to redis...')
})

redisClient.on('ready', () => {
    console.log('Client connected to redis and ready to use...')
})

redisClient.on('error', (err) => {
    console.log(err.message)
})

redisClient.on('end', () => {
    console.log('Client disconnected from redis')
})

// eslint-disable-next-line no-undef
process.on('SIGINT', () => {
    redisClient.quit()
})
module.exports = {
    redisClient
}
