'use strict';
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('aboutus', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            title_tm: {
                type: DataTypes.STRING
            },
            title_ru: {
                type: DataTypes.STRING
            },
            title_en: {
                type: DataTypes.STRING
            },
            body_tm: {
                type: DataTypes.STRING
            },
            body_ru: {
                type: DataTypes.STRING
            },
            body_en: {
                type: DataTypes.STRING
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        });
    },
    async down(queryInterface, DataTypes) {
        await queryInterface.dropTable('aboutus');
    }
};