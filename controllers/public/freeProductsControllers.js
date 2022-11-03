const Op = require('sequelize').Op;
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const {
    Freeproducts,
    Sharingusers,
    Images,
    Users,
} = require('../../models');
exports.getAllFreeProducts = catchAsync(async(req, res, next) => {
    const free_products = await Freeproducts.findAll({
        order: [
            [
                "expire_date", "DESC"
            ]
        ],
        include: {
            model: Images,
            as: "images"
        }
    })
    let new_array = []
    for (let i = 0; i < free_products.length; i++) {
        const max_share = await Sharingusers.max("count", { where: { freeproductId: free_products[i].id } })
        if (i == 0) {
            const objj = {
                date: free_products[i].expire_date,
                free_products: [free_products[i]]
            }
            if (max_share) objj.free_products[i].max = max_share
            new_array.push(objj);
        } else {
            let bool = true;
            for (let j = 0; j < new_array.length; j++) {
                if (new_array[j].date == free_products[i].expire_date) {
                    new_array[j].free_products.push(free_products[i]);
                    bool = false;
                    break
                }
            }
            if (bool) {
                new_array.push({
                    date: free_products[i].expire_date,
                    free_products: [free_products[i]]
                })
            }
        }
    }
    return res.status(200).send(new_array)
})
exports.getOne = catchAsync(async(req, res, next) => {
    const free_product = await Freeproducts.findOne({ where: { freeproduct_id: req.params.id } })
    if (!free_product) return next(new AppError("Free product not found with that id", 404))
    const max = await Sharingusers.max("count", { where: { freeproductId: free_product.id } })
    free_product.max = max
    const top5 = await Sharingusers.findAll({
        where: { freeproductId: free_product.id },
        order: [
            ["count", "DESC"]
        ],
        limit: 5
    })
    let ready_top5 = []
    for (const top of top5) {
        const user = await Users.findOne({
            where: { id: top.userId },
            attributes: ["image", "nickname"]
        })
        let obj = {
            count: top.count,
            nickname: user.nickname,
            image: user.image
        }
        ready_top5.push(obj)
    }
    return res.status(200).send({ free_product, top5: ready_top5 })
})