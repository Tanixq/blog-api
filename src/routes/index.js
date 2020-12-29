const express = require("express")
const router = express.Router()
const userRoutes = require("./user")
const blogRoutes = require("./blog")
const adminRoutes = require("./admin.js")

router.use("/users", userRoutes)
router.use("/blogs", blogRoutes)
router.use("/admin", adminRoutes)
module.exports = router
