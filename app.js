const express = require("express")
const bodyParser = require("body-parser")
const routes = require("./src/routes")
const app = express()
require("./src/common/helper/redisClient")

// Connect to mongodb
require("./db")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api", routes)

let port = process.env.PORT
if (port == null || port == "") {
  port = 5000
}
app.listen(port, (reqest, response) => {
  console.log(`Server Started Sucessfully on Port ${port} !`)
})
