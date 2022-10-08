'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Products',{
      fields: ['id_shop'],
      type: 'foreign key',
      references:{
        table: 'Shops',
        field: 'id'
      }
    })
    queryInterface.addConstraint('Products',{
      fields: ['unit'],
      type: 'foreign key',
      references:{
        table: 'Unit_details',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Products',{
      fields: ['id_shop'],
      type: 'foreign key',
      references:{
        table: 'Shops',
        field: 'id'
      }
    })
    queryInterface.removeConstraint('Products',{
      fields: ['unit'],
      type: 'foreign key',
      references:{
        table: 'Unit_details',
        field: 'id'
      }
    })
  }
};
