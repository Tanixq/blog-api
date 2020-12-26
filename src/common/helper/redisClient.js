// const { 
//     REDIS_URL
// } = require('../../../config/config')
// const Promise = require('bluebird')
// const redis = Promise.promisifyAll(require('redis'))
// const createRedisClient = (redisUrl) => {
//     const redisInstance = redis.createClient(redisUrl, { detect_buffers: true })
//     return redisInstance
// }

// const redisClient = createRedisClient(`${REDIS_URL}`)
// console.log("connected redis successfully");

// module.exports = {
//     redisClient
// }