'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Links extends Model {

        static associate(models) {}
    }
    Links.init({
        name: DataTypes.STRING,
        link: DataTypes.STRING
    }, {
        sequelize,
        tableName: "links",
        modelName: 'Links',
    });
    return Links;
};