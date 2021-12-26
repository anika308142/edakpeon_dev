'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'John',
      usernumber: 'Doe',
      password: 'example@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    //  return queryInterface.bulkDelete('Users', null, {});
  }
};
