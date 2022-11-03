const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const {
    Links
} = require('../../models');
exports.getAllLinks = catchAsync(async(req, res) => {
    const limit = req.query.limit || 20;
    const offset = req.query.offset;
    let order
    order = [
        ["id", "DESC"]
    ]
    const links = await Links.findAndCountAll({
        limit,
        offset,
        order,
    });
    return res.status(200).send(links);
});
exports.editLink = catchAsync(async(req, res, next) => {
    const links = req.body
    for (let i = 0; i < links.length; i++) {
        await Links.update({ name: links[i].name, link: links[i].link }, { where: { id: i + 1 } })
    }
    return res.status(200).send("Success")
});