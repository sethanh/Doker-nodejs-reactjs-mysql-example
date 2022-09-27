'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Invoices_requests',{
      fields: ['id_customer'],
      type: 'foreign key',
      references:{
        table: 'Customers',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Invoices_requests',{
      fields: ['id_customer'],
      type: 'foreign key',
      references:{
        table: 'Customers',
        field: 'id'
      }
    })
  }
};
