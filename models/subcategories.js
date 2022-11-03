'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Subcategories extends Model {

        static associate({ Categories }) {
            this.belongsTo(Categories, { foreignKey: "categoryId", as: "category" })
        }
    }
    Subcategories.init({
        subcategory_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name_tm: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Subcategory name cannot be null",
                },
                notEmpty: {
                    msg: "Subcategory name cannot be empty",
                },
            },
        },
        name_ru: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Subcategory name cannot be null",
                },
                notEmpty: {
                    msg: "Subcategory name cannot be empty",
                },
            },
        },
        name_en: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Subcategory name cannot be null",
                },
                notEmpty: {
                    msg: "Subcategory name cannot be empty",
                },
            },
        },
        body_tm: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Category name cannot be null",
                },
                notEmpty: {
                    msg: "Category name cannot be empty",
                },
            },
        },
        body_ru: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Category name cannot be null",
                },
                notEmpty: {
                    msg: "Category name cannot be empty",
                },
            },
        },
        body_en: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Category name cannot be null",
                },
                notEmpty: {
                    msg: "Category name cannot be empty",
                },
            },
        },
        categoryId: DataTypes.INTEGER
    }, {
        sequelize,
        tableName: "subcategories",
        modelName: 'Subcategories',
    });
    return Subcategories;
};