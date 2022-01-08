'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {
        id: "9f8a488a-63bd-4989-8f7e-7dd187d3fda2",
        name: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "fc40201c-e771-4748-b82b-26af1813fbf4",
        name: "user",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
