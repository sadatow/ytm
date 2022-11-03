'use strict';
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('ourworks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            text_tm: {
                type: DataTypes.STRING
            },
            text_ru: {
                type: DataTypes.STRING
            },
            text_en: {
                type: DataTypes.STRING
            },
            icon: {
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
        await queryInterface.dropTable('ourworks');
    }
};