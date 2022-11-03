'use strict';

module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.bulkInsert(
            "aboutus", [{
                    title_tm: "title birinji tm",
                    title_ru: "title birinji tm",
                    title_en: "title birinji tm",
                    body_tm: "body birinji tm",
                    body_ru: "body birinji ru",
                    body_en: "body birinji en",
                    createdAt: DataTypes.fn('now'),
                    updatedAt: DataTypes.fn('now'),
                },
                {
                    title_tm: "title ikinji tm",
                    title_ru: "title ikinji tm",
                    title_en: "title ikinji tm",
                    body_tm: "body ikinji tm",
                    body_ru: "body ikinji ru",
                    body_en: "body ikinji en",
                    createdAt: DataTypes.fn('now'),
                    updatedAt: DataTypes.fn('now'),
                }
            ], {}
        )
    },

    async down(queryInterface, DataTypes) {}
};