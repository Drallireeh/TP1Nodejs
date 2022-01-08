'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        id: "d4073966-b7e4-4ca1-8d29-efc0f3bfde13",
        content: "Je suis content pour toi !",
        date: new Date(),
        postId: "eb403876-350d-42e9-9538-c5f12e95a52e",
        userId: "e00dd53d-1f49-45f4-9763-209893740ee9",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "6ff61bd3-0244-44e0-b5b6-900712d1d923",
        content: "Super !",
        date: new Date(),
        postId: "4df182c4-7fa3-4643-b9b9-febd734d8a84",
        userId: "e00dd53d-1f49-45f4-9763-209893740ee9",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "de1e725d-1178-455e-b42f-cbfb0a82df71",
        content: "Quelle chance !",
        date: new Date(),
        postId: "4df182c4-7fa3-4643-b9b9-febd734d8a84",
        userId: "bb7f5a93-3b4f-42a3-a793-2c035e57899c",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
