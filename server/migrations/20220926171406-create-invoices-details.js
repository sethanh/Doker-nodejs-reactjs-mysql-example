'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invoices_details', {
      id_invoices: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_product: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantify: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Invoices_details');
  }
};