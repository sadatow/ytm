'use strict';

module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.bulkInsert(
            "mainpage", [{
                title_tm: "bash sahypa title tm",
                title_ru: "bash sahypa title ru",
                title_en: "bash sahypa title en",
                big_title_tm: "ashakdaky ullakan title tm",
                big_title_ru: "ashakdaky ullakan title ru",
                big_title_en: "ashakdaky ullakan title en",
                first_line_tm: "birinji liniya tm",
                first_line_ru: "birinji liniya ru",
                first_line_en: "birinji liniya en",
                second_line_tm: "ikinji liniya tm",
                second_line_ru: "ikinji liniya ru",
                second_line_en: "ikinji liniya en",
                third_line_tm: "ucunji liniya tm",
                third_line_ru: "ucunji liniya ru",
                third_line_en: "ucunji liniya en",
                createdAt: DataTypes.fn('now'),
                updatedAt: DataTypes.fn('now'),
            }], {}
        )
    },

    async down(queryInterface, DataTypes) {}
};