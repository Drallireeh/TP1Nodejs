'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [
      {
        id: "eb403876-350d-42e9-9538-c5f12e95a52e",
        title: "Mes News",
        content: "I'm going to London !",
        date: new Date(),
        userId: "e00dd53d-1f49-45f4-9763-209893740ee9",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "4df182c4-7fa3-4643-b9b9-febd734d8a84",
        title: "Les News de Franck",
        content: "Très content de partir en France !",
        date: new Date(),
        userId: "e00dd53d-1f49-45f4-9763-209893740ee9",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "ca3c6353-720d-4fab-a706-751577ec83d5",
        title: "La petite compagnie",
        content: "lalala on chante au grès du vent",
        date: new Date(),
        userId: "bb7f5a93-3b4f-42a3-a793-2c035e57899c",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
