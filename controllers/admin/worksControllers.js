const sharp = require('sharp');
const fs = require('fs');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');

const { Ourworks, Aboutus } = require('../../models');

exports.addWork = catchAsync(async(req, res, next) => {
    const newWork = await Ourworks.create(req.body);
    return res.status(201).send(newWork);
});
exports.editWork = catchAsync(async(req, res, next) => {
    const updatework = await Ourworks.findOne({ ourwork_id: req.params.id })
    console.log(req.body)
    if (!updatework)
        return next(new AppError("Work with that id not found"), 404)
    await updatework.update(req.body)
    return res.status(200).send(updatework)
})
exports.uploadWorkImage = catchAsync(async(req, res, next) => {
    const work_id = req.params.id;
    console.log(work_id)
    const banner = await Ourworks.findOne({ where: { work_id } });
    req.files = Object.values(req.files)
    if (!banner)
        return next(new AppError('Banner did not found with that ID', 404));
    const image = `${work_id}_work.webp`;
    const photo = req.files[0].data
    let buffer = await sharp(photo).webp().toBuffer()
    await sharp(buffer).toFile(`static/${image}`);

    await banner.update({
        image,
    });

    return res.status(201).send(banner);
});
exports.deleteWork = catchAsync(async(req, res, next) => {
    const work_id = req.params.id;
    const ourwork = await Ourworks.findOne({ where: { work_id } });

    if (!ourwork)
        return next(new AppError('Banner did not found with that ID', 404));

    if (ourwork.image) {
        fs.unlink(`static/${work_id}_work.webp`, function(err) {
            if (err) throw err;
        });
    }
    await ourwork.destroy();

    return res.status(200).send('Successfully Deleted');
});
exports.editAboutUs = catchAsync(async(req, res, next) => {
    const { first, second } = req.body
    const one = await Aboutus.findOne({ where: { id: 1 } })
    await one.update(first)
    const two = await Aboutus.findOne({ where: { id: 2 } })
    await two.update(first, second)
    return res.status(200).send({ one, two })
})