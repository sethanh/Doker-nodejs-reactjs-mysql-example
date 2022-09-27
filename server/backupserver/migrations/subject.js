"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("subject", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            subject: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            vietnam: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            english: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE(3),
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE(3),
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)"),
                allowNull: false,
            },
        }).then(() => {
            return queryInterface.addIndex("subject", ["id"])
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("subject");
    },
};