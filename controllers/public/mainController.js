const { Op } = require('sequelize');
const {
    Mainpage
} = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.getMainpage = catchAsync(async(req, res, next) => {
    const mainpage = await Mainpage.findOne()
    return res.status(200).send(mainpage)
})