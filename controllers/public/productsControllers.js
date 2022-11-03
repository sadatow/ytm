const { Op } = require('sequelize');
const {
    Products,
    Categories,
    Subcategories,
    Stock,
    Brands,
    Productcolor,
    Productsizes,
    Images,
    Details,
    Seller
} = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
exports.getProducts = catchAsync(async(req, res) => {
    const limit = req.query.limit || 10;
    const { offset } = req.query;
    var order, where;
    const products = await Products.findAll({
        isActive: true,
        order,
        limit,
        offset,
        include: [{
            model: Images,
            as: "images"
        }, ],
        where
    });
    return res.status(200).json(products);
});
exports.getTopProducts = catchAsync(async(req, res) => {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const { sort, isAction, discount } = req.query
    let order, where = []
    if (sort == 1) {
        order = [
            ['price', 'DESC']
        ];
    } else if (sort == 0) {
        order = [
            ['price', 'ASC']
        ];
    } else order = [
        ['updatedAt', 'DESC']
    ];
    where = getWhere(req.query)
    if (discount && discount != "false") {
        let discount = {
            [Op.ne]: 0
        }
        where.push({ discount })
    }
    if (isAction) {
        where.push({ isAction })
    }
    order.push(["sold_count", "DESC"])
    if (isAction) where.isAction = isAction;
    const products = await Products.findAll({
        isActive: true,
        limit,
        offset,
        order,
        where,
        include: {
            model: Images,
            as: "images"
        },
    });
    return res.status(200).json(products);
});
exports.getLikedProducts = catchAsync(async(req, res) => {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const { sort, isAction, max_price, min_price, discount, sex } = req.query
    let order, where = []
    if (sort == 1) {
        order = [
            ['price', 'DESC']
        ];
    } else if (sort == 0) {
        order = [
            ['price', 'ASC']
        ];
    } else if (sort == 3) {
        order = [
            ["sold_count", "DESC"]
        ]
    } else order = [
        ['updatedAt', 'DESC']
    ];
    if (max_price && min_price == "") {
        let price = {
            [Op.lte]: max_price
        }
        where.push({ price })
    } else if (max_price == "" && min_price) {
        let price = {
            [Op.gte]: min_price
        }
        where.push({ price })

    } else if (max_price && min_price) {
        let price = {
            [Op.and]: [{
                    price: {
                        [Op.gte]: min_price
                    }
                },
                {
                    price: {
                        [Op.lte]: max_price
                    }
                }
            ],
        }
        where.push(price)
    }
    if (sex) {
        sex.split = (",")
        var array = []
        for (let i = 0; i < sex.length; i++) {
            array.push({
                sex: {
                    [Op.eq]: sex[i]
                }
            })
        }
        where.push(array)
    }
    if (discount && discount != "false") {
        let discount = {
            [Op.ne]: 0
        }
        where.push({ discount })
    }
    if (isAction) {
        where.push({ isAction })
    }
    order.push(["like_count", "DESC"])
    if (isAction) where.isAction = isAction
    const products = await Products.findAll({
        isActive: true,
        order,
        limit,
        offset,
        where,
        include: {
            model: Images,
            as: "images"
        },
    });
    return res.status(200).json(products);
});
// Search
const capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
exports.searchProducts = catchAsync(async(req, res, next) => {
    const limit = req.query.limit || 20;
    let { keyword, offset, sort } = req.query;
    var order;
    if (sort == 1) {
        order = [
            ['price', 'DESC']
        ];
    } else if (sort == 0) {
        order = [
            ['price', 'ASC']
        ];
    } else order = [
        ['updatedAt', 'DESC']
    ];

    let keywordsArray = [];
    keyword = keyword.toLowerCase();
    keywordsArray.push('%' + keyword + '%');
    keyword = '%' + capitalize(keyword) + '%';
    keywordsArray.push(keyword);
    let where = {
        where: {
            [Op.or]: [{
                    name_tm: {
                        [Op.like]: {
                            [Op.any]: keywordsArray,
                        },
                    },
                },
                {
                    name_ru: {
                        [Op.like]: {
                            [Op.any]: keywordsArray,
                        },
                    },

                },
            ],
            isActive: true,
        },
    }
    const products = await Products.findAll({
        where,
        order,
        limit,
        offset,
    });
    const subcategories = await Subcategories.findAll({
        where,
        order,
        limit,
        offset
    })
    const seller = await Seller.findAll({
        where,
        order,
        limit,
        offset
    })
    return res.status(200).send({ products, subcategories, seller });
});
exports.searchLite = catchAsync(async(req, res, next) => {
    let { keyword } = req.query
    let keywordsArray = [];
    keyword = keyword.toLowerCase();
    keywordsArray.push('%' + keyword + '%');
    keyword = '%' + capitalize(keyword) + '%';
    keywordsArray.push(keyword);
    const products = await Products.findAll({
        attributes: ["name_tm", "name_ru"],
        where: {
            [Op.or]: [{
                    name_tm: {
                        [Op.like]: {
                            [Op.any]: keywordsArray,
                        },
                    },
                },
                {
                    name_ru: {
                        [Op.like]: {
                            [Op.any]: keywordsArray,
                        },
                    },

                },
            ],
            isActive: true,
        }
    });
    return res.status(200).send({ products });
})
exports.getOneProduct = catchAsync(async(req, res, next) => {
    const product_id = req.params.id
    const oneProduct = await Products.findOne({
        where: { product_id },
        include: [{
                model: Productcolor,
                as: "product_colors",
                include: [{
                        model: Images,
                        as: "product_images"
                    },
                    {
                        model: Productsizes,
                        as: "product_sizes",
                        include: {
                            model: Stock,
                            as: "product_size_stock"
                        }
                    }
                ]
            },
            {
                model: Productsizes,
                as: "product_sizes",
                include: {
                    model: Stock,
                    as: "product_size_stock"
                }
            },
            {
                model: Stock,
                as: "product_stock",
                limit: 1
            },
            {
                model: Images,
                as: "images"
            },
            {
                model: Details,
                as: "details"
            },
            {
                model: Brands,
                as: "brand"
            },
            {
                model: Seller,
                as: "seller"
            }
        ]
    })
    if (!oneProduct) {
        return next(new AppError("Can't find product with that id"), 404);
    }
    const id = oneProduct.categoryId
    const recommenendations = await Categories.findOne({
        where: { id },
        include: {
            model: Products,
            as: "products",
            where: {
                id: {
                    [Op.ne]: oneProduct.id
                }
            },
            limit: 4,
            order: [
                ["id", "DESC"]
            ],
            include: {
                model: Images,
                as: "images",
            }
        }
    })
    const product = {
        oneProduct,
        recommenendations
    }
    return res.send({ product })
})
exports.discount = catchAsync(async(req, res, next) => {
    const limit = req.query.limit || 20;
    const offset = req.query.offset || 0;
    const { sort, isAction, max_price, min_price, sex } = req.query
    let order, where = []
    if (sort == 1) {
        order = [
            ['price', 'DESC']
        ];
    } else if (sort == 0) {
        order = [
            ['price', 'ASC']
        ];
    } else if (sort == 3) {
        order = [
            ["sold_count", "DESC"]
        ]
    } else order = [
        ['updatedAt', 'DESC']
    ];
    where = getWhere(req.query)
    let discount = {
        [Op.ne]: 0
    }
    if (isAction) where.push({ isAction })
    where.push({ discount })
    console.log(where)
    order.push(["images", "id", "DESC"])
    const discount_products = await Products.findAll({
        where,
        order,
        limit,
        offset,
        include: [{
            model: Images,
            as: "images"
        }],
    });

    return res.status(200).send({ discount_products })
})
exports.actionProducts = catchAsync(async(req, res, next) => {
    const limit = req.query.limit || 20;
    const offset = req.query.offset || 0;
    const { sort, max_price, min_price, discount, sex } = req.query
    let order, where = []
    if (sort == 1) {
        order = [
            ['price', 'DESC']
        ];
    } else if (sort == 0) {
        order = [
            ['price', 'ASC']
        ];
    } else if (sort == 3) {
        order = [
            ["sold_count", "DESC"]
        ]
    } else order = [
        ['updatedAt', 'DESC']
    ];
    if (max_price && min_price == "") {
        let price = {
            [Op.lte]: max_price
        }
        where.push({ price })
    } else if (max_price == "" && min_price) {
        let price = {
            [Op.gte]: min_price
        }
        where.push({ price })

    } else if (max_price && min_price) {
        let price = {
            [Op.and]: [{
                    price: {
                        [Op.gte]: min_price
                    }
                },
                {
                    price: {
                        [Op.lte]: max_price
                    }
                }
            ],
        }
        where.push(price)
    }
    if (sex) {
        sex.split = (",")
        var array = []
        for (let i = 0; i < sex.length; i++) {
            array.push({
                sex: {
                    [Op.eq]: sex[i]
                }
            })
        }
        where.push(array)
    }
    if (discount && discount != "false") {
        let discount = {
            [Op.ne]: 0
        }
        where.push({ discount })
    }
    where.push({ isAction: true })
    let action_products = await Products.findAll({
        where,
        order,
        limit,
        offset,
        include: [{
            model: Images,
            as: "images"
        }, ]
    });
    const count = await Products.count(where)
    return res.status(200).send({ action_products, count })
})
exports.newProducts = catchAsync(async(req, res) => {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const { sort, isAction, max_price, min_price, discount, sex } = req.query
    let order, where = []
    if (sort == 1) {
        order = [
            ['price', 'DESC']
        ];
    } else if (sort == 0) {
        order = [
            ['price', 'ASC']
        ];
    } else if (sort == 3) {
        order = [
            ["sold_count", "DESC"]
        ]
    } else order = [
        ['updatedAt', 'DESC']
    ];
    if (max_price && min_price == "") {
        let price = {
            [Op.lte]: max_price
        }
        where.push({ price })
    } else if (max_price == "" && min_price) {
        let price = {
            [Op.gte]: min_price
        }
        where.push({ price })

    } else if (max_price && min_price) {
        let price = {
            [Op.and]: [{
                    price: {
                        [Op.gte]: min_price
                    }
                },
                {
                    price: {
                        [Op.lte]: max_price
                    }
                }
            ],
        }
        where.push(price)
    }
    if (sex) {
        sex.split = (",")
        var array = []
        for (let i = 0; i < sex.length; i++) {
            array.push({
                sex: {
                    [Op.eq]: sex[i]
                }
            })
        }
        where.push(array)
    }
    if (discount && discount != "false") {
        let discount = {
            [Op.ne]: 0
        }
        where.push({ discount })
    }
    if (isAction) {
        where.push({ isAction })
    }
    where.push({ isNew: true })
    order.push(["images", "id", "DESC"])
    const new_products = await Products.findAll({
        where, //isActive goy
        order,
        limit,
        offset,
        include: [{
            model: Images,
            as: "images"
        }]
    });
    const count = await Products.count({ where })
    return res.status(200).send({ new_products, count });
});
exports.setRating = catchAsync(async(req, res, next) => {
    const product = await Products.findOne({ where: { product_id: req.params.id } })
    if (!product) {
        return next(new AppError("Product not found"), 404)
    }
    let rating = ((product.rating * product.rating_count) + req.body.rating) / (product.rating_count + 1)
    await product.update({ rating, rating_count: product.rating_count + 1 })
    return res.status(200).send({ product })
})

function getWhere({ max_price, min_price, sex }) {
    let where = []
    if (max_price && min_price == "") {
        let price = {
            [Op.lte]: max_price
        }
        where.push({ price })
    } else if (max_price == "" && min_price) {
        let price = {
            [Op.gte]: min_price
        }
        where.push({ price })

    } else if (max_price && min_price) {
        let price = {
            [Op.and]: [{
                    price: {
                        [Op.gte]: min_price
                    }
                },
                {
                    price: {
                        [Op.lte]: max_price
                    }
                }
            ],
        }
        where.push(price)
    }
    if (sex) {
        sex.split = (",")
        var array = []
        for (let i = 0; i < sex.length; i++) {
            array.push({
                sex: {
                    [Op.eq]: sex[i]
                }
            })
        }
        where.push(array)

    }
    return where
}