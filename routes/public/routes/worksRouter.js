const express = require('express');
const {
    getAllWorks
} = require('../../../controllers/public/workControllers');

const router = express.Router();
router.get('/', getAllWorks);
module.exports = router;