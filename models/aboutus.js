'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Aboutus extends Model {
        static associate(models) {}
    }
    Aboutus.init({
        title_tm: DataTypes.STRING,
        title_ru: DataTypes.STRING,
        title_en: DataTypes.STRING,
        body_tm: DataTypes.STRING,
        body_ru: DataTypes.STRING,
        body_en: DataTypes.STRING
    }, {
        sequelize,
        tableName: "aboutus",
        modelName: 'Aboutus',
    });
    return Aboutus;
};