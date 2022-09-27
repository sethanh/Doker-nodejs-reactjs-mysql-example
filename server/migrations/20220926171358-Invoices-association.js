'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Invoices',{
      fields: ['id_customer'],
      type: 'foreign key',
      references:{
        table: 'Customers',
        field: 'id'
      }
    })
    queryInterface.addConstraint('Invoices',{
      fields: ['id_staff'],
      type: 'foreign key',
      references:{
        table: 'Staffs',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Invoices',{
      fields: ['id_customer'],
      type: 'foreign key',
      references:{
        table: 'Customers',
        field: 'id'
      }
    })
    queryInterface.removeConstraint('Invoices',{
      fields: ['id_staff'],
      type: 'foreign key',
      references:{
        table: 'Staffs',
        field: 'id'
      }
    })
  }
};
