'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('mainpage', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title_tm: {
                type: Sequelize.STRING
            },
            title_ru: {
                type: Sequelize.STRING
            },
            title_en: {
                type: Sequelize.STRING
            },
            big_title_tm: {
                type: Sequelize.STRING
            },
            big_title_ru: {
                type: Sequelize.STRING
            },
            big_title_en: {
                type: Sequelize.STRING
            },
            first_line_tm: {
                type: Sequelize.STRING
            },
            first_line_ru: {
                type: Sequelize.STRING
            },
            first_line_en: {
                type: Sequelize.STRING
            },
            second_line_tm: {
                type: Sequelize.STRING
            },
            second_line_ru: {
                type: Sequelize.STRING
            },
            second_line_en: {
                type: Sequelize.STRING
            },
            first_line_tm: {
                type: Sequelize.STRING
            },
            third_line_tm: {
                type: Sequelize.STRING
            },
            third_line_ru: {
                type: Sequelize.STRING
            },
            third_line_en: {
                type: Sequelize.STRING
            },
            first_line_tm: {
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
        await queryInterface.dropTable('mainpage');
    }
};