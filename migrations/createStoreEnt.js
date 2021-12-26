'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StoreEnt', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      seid: {
        type: Sequelize.TEXT
      },
      store_name: {
        type: Sequelize.TEXT
      },
      store_number: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      },
      photos: {
        type: Sequelize.STRING
      },
      card_name: {
        type: Sequelize.STRING
      },
      account_details: {
        type: Sequelize.STRING
      },
      division: {
        type: Sequelize.STRING
      },
      district: {
        type: Sequelize.STRING
      },
      upazilla: {
        type: Sequelize.STRING
      },
      address_details: {
        type: Sequelize.STRING
      },
      nid: {
        type: Sequelize.STRING
      },
      mobile_bank: {
        type: Sequelize.STRING
      },
      account_no: {
        type: Sequelize.STRING
      },
      approved: {
        type: Sequelize.STRING
      },
      usernumber: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StoreEnt');
  }
};