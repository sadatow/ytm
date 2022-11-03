const catchAsync = require('../../utils/catchAsync');
const { Mainpage } = require('../../models');
exports.editMainpage = catchAsync(async(req, res, next) => {
    const mainpage = await Mainpage.findOne()
    await mainpage.update(req.body)
    return res.status(200).send(mainpage)
})