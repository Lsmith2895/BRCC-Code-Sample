'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.changeColumn('Todo', 'id', {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      });
    },
  
    async down(queryInterface, Sequelize) {
      await queryInterface.changeColumn('Todo', 'id', {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      });
    }
};
