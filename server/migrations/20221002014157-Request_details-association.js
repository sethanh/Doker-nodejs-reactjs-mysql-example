'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Request_details',{
      fields: ['id_invoices_request'],
      type: 'foreign key',
      references:{
        table: 'Invoices_requests',
        field: 'id'
      }
    })
    queryInterface.addConstraint('Request_details',{
      fields: ['id_product'],
      type: 'foreign key',
      references:{
        table: 'Products',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Request_details',{
      fields: ['id_invoices_request'],
      type: 'foreign key',
      references:{
        table: 'Invoices_requests',
        field: 'id'
      }
    })
    queryInterface.removeConstraint('Request_details',{
      fields: ['id_product'],
      type: 'foreign key',
      references:{
        table: 'Products',
        field: 'id'
      }
    })
  }
};
