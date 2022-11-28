const express = require('express');
const {
    getAllWorks, getAboutUs
} = require('../../../controllers/public/workControllers');

const router = express.Router();
router.get('/', getAllWorks);
router.get("/about-us",getAboutUs)
module.exports = router;