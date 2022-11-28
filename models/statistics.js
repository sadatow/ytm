'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Statistics extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Statistics.init({
        first_tm: DataTypes.STRING,
        first_ru: DataTypes.STRING,
        first_en: DataTypes.STRING,
        second_tm: DataTypes.STRING,
        second_ru: DataTypes.STRING,
        second_en: DataTypes.STRING,
        first_number: DataTypes.STRING,
        second_number: DataTypes.STRING,
        third_number: DataTypes.STRING
    }, {
        sequelize,
        tableName:"statistics",
        modelName: 'Statistics',
    });
    return Statistics;
};