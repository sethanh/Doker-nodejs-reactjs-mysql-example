'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Admins',{
      fields: ['id_user'],
      type: 'foreign key',
      references:{
        table: 'Users',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Admins',{
      fields: ['id_user'],
      type: 'foreign key',
      references:{
        table: 'Users',
        field: 'id'
      }
    })
  }
};
