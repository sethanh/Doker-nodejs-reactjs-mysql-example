'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Cart_details',{
      fields: ['id_customer'],
      type: 'foreign key',
      references:{
        table: 'Customers',
        field: 'id'
      }
    })
    queryInterface.addConstraint('Cart_details',{
      fields: ['id_product'],
      type: 'foreign key',
      references:{
        table: 'Products',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Cart_details',{
      fields: ['id_customer'],
      type: 'foreign key',
      references:{
        table: 'Customers',
        field: 'id'
      }
    })
    queryInterface.removeConstraint('Cart_details',{
      fields: ['id_product'],
      type: 'foreign key',
      references:{
        table: 'Products',
        field: 'id'
      }
    })
  }
};
