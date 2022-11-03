 'use strict';
 const {
     Model
 } = require('sequelize');
 module.exports = (sequelize, DataTypes) => {
     class Mainpage extends Model {
         static associate(models) {}
     }
     Mainpage.init({
         title_tm: DataTypes.STRING,
         title_ru: DataTypes.STRING,
         title_en: DataTypes.STRING,
         big_title_tm: DataTypes.STRING,
         big_title_ru: DataTypes.STRING,
         big_title_en: DataTypes.STRING,
         first_line_tm: DataTypes.STRING,
         first_line_ru: DataTypes.STRING,
         first_line_en: DataTypes.STRING,
         second_line_tm: DataTypes.STRING,
         second_line_ru: DataTypes.STRING,
         second_line_en: DataTypes.STRING,
         third_line_tm: DataTypes.STRING,
         third_line_ru: DataTypes.STRING,
         third_line_en: DataTypes.STRING,
     }, {
         sequelize,
         tableName: "mainpage",
         modelName: 'Mainpage',
     });
     return Mainpage;
 };