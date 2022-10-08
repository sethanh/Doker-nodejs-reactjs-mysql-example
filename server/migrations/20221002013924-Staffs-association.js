'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Staffs',{
      fields: ['id_user'],
      type: 'foreign key',
      references:{
        table: 'Users',
        field: 'id'
      }
    })
    queryInterface.addConstraint('Staffs',{
      fields: ['id_shop'],
      type: 'foreign key',
      references:{
        table: 'Shops',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Staffs',{
      fields: ['id_user'],
      type: 'foreign key',
      references:{
        table: 'Users',
        field: 'id'
      }
    })
    queryInterface.removeConstraint('Staffs',{
      fields: ['id_shop'],
      type: 'foreign key',
      references:{
        table: 'Shops',
        field: 'id'
      }
    })
  }
};
