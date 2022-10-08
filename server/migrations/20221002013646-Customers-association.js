'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Customers',{
      fields: ['id_user'],
      type: 'foreign key',
      references:{
        table: 'Users',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Customers',{
      fields: ['id_user'],
      type: 'foreign key',
      references:{
        table: 'Users',
        field: 'id'
      }
    })
  }
};
