'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Invoices_details',{
      fields: ['id_invoices'],
      type: 'foreign key',
      references:{
        table: 'Invoices',
        field: 'id'
      }
    })
    queryInterface.addConstraint('Invoices_details',{
      fields: ['id_product'],
      type: 'foreign key',
      references:{
        table: 'Product',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Invoices_details',{
      fields: ['id_invoices'],
      type: 'foreign key',
      references:{
        table: 'Invoices',
        field: 'id'
      }
    })
    queryInterface.removeConstraint('Invoices_details',{
      fields: ['id_product'],
      type: 'foreign key',
      references:{
        table: 'Product',
        field: 'id'
      }
    })
  }
};
