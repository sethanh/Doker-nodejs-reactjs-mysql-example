"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("users", {
            id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            birthday:{
                type: Sequelize.DATE(3),
                allowNull: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            username: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            rule: {
                type: Sequelize.ENUM("admin", "customer","staff","management"),
                allowNull: true,
                default: 'customer'
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE(3),
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
            },
            updated_at: {
                type: Sequelize.DATE(3),
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)"),
            },
        }).then(() => {
            return queryInterface.addIndex("users", ["id"])
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("users");
    },
};