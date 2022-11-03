'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Ourworks extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Ourworks.init({
        text_tm: DataTypes.STRING,
        text_ru: DataTypes.STRING,
        text_en: DataTypes.STRING,
        icon: DataTypes.STRING
    }, {
        sequelize,
        tableName: "ourworks",
        modelName: 'Ourworks',
    });
    return Ourworks;
};