'use strict';

module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.bulkInsert(
            "statistics", [{
                first_tm: "birinji liniya tm",
                first_ru: "birinji liniya ru",
                first_en: "birinji liniya en",
                second_tm: "ikinji liniya tm",
                second_ru: "ikinji liniya ru",
                second_en: "ikinji liniya en",
                first_number: "10",
                second_number: "20",
                third_number: "30",
                createdAt: DataTypes.fn('now'),
                updatedAt: DataTypes.fn('now'),
            }], {}
        )
    },

    async down(queryInterface, DataTypes) {

    }
};