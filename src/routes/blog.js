const express = require("express")
const { blogs } = require("../controllers")
const router = express.Router()

router.get("/", blogs)

module.exports = router
