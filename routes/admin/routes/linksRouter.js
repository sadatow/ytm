 const express = require('express');
 const {
     getAllLinks,
     editLink
 } = require('../../../controllers/admin/brandsControllers');
 const router = express.Router();
 router.get('/', getAllLinks);
 router.patch('/:id', editLink);
 module.exports = router;