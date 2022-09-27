'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Shops',{
      fields: ['id_manager'],
      type: 'foreign key',
      references:{
        table: 'Managers',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Shops',{
      fields: ['id_manager'],
      type: 'foreign key',
      references:{
        table: 'Managers',
        field: 'id'
      }
    })
  }
};
