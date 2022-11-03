'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('statistics', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            first_tm: {
                type: Sequelize.STRING
            },
            first_ru: {
                type: Sequelize.STRING
            },
            first_en: {
                type: Sequelize.STRING
            },
            second_tm: {
                type: Sequelize.STRING
            },
            second_ru: {
                type: Sequelize.STRING
            },
            second_en: {
                type: Sequelize.STRING
            },
            first_number: {
                type: Sequelize.STRING
            },
            second_number: {
                type: Sequelize.STRING
            },
            third_number: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('statistics');
    }
};