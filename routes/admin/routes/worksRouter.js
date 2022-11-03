const express = require('express');
const { addWork, editWork, deleteWork, uploadWorkImage, editAboutUs } = require('../../../controllers/admin/worksControllers');
const { getAllWorks, getAboutUs } = require('../../../controllers/public/workControllers');
const router = express.Router();

router.get('/', getAllWorks);
router.post('/add', addWork);
router.patch("/:id", editWork)
router.delete('/:id', deleteWork);
router.post('/upload-image/:id', uploadWorkImage);
router.patch("/about-us", editAboutUs)
router.get("/about-us", getAboutUs)

module.exports = router;