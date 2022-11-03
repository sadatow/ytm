const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { Ourworks, Aboutus } = require('../../models');

exports.getAllWorks = catchAsync(async(req, res) => {
    const limit = req.query.limit || 20;
    const offset = req.query.offset;

    const ourworks = await Ourworks.findAndCountAll({
        order: [
            ['updatedAt', 'DESC']
        ],
        limit,
        offset,
    });

    return res.status(200).send({ ourworks });
});
exports.getAboutUs = catchAsync(async(req, res, next) => {
    const aboutus = await Aboutus.findAll({
        order: [
            ["id", "DESC"]
        ]
    })
    return res.status(200).send(aboutus)
})