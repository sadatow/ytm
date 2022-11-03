const express = require('express')
const router = express.Router()
const { login, protect, updateMe, sendMe } = require("../../controllers/admin/adminControllers")
router.post("/login", login)
router.post("/edit", protect, updateMe)
router.get("/get-me", protect, sendMe)
router.use("/links", protect, require("./routes/linksRouter"))
router.use('/categories', require('./routes/categoriesRouter')); //delete test etmeli
router.use("/subcategories", require("./routes/subcategoriesRouter")) //test edildi
router.use("/main", require("./routes/mainRouter"))
router.use("/works", require("./routes/worksRouter"))
module.exports = router