'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Managers',{
      fields: ['id_user'],
      type: 'foreign key',
      references:{
        table: 'Users',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Managers',{
      fields: ['id_user'],
      type: 'foreign key',
      references:{
        table: 'Users',
        field: 'id'
      }
    })
  }
};
