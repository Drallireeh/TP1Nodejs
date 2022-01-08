'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id: 'e00dd53d-1f49-45f4-9763-209893740ee9',
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      username: "johndoe",
      github: "https://github.com",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "bb7f5a93-3b4f-42a3-a793-2c035e57899c",
      lastname: "Herillard",
      firstname: "Kenny",
      email: "oui@hotmail.com",
      username: "Dralli",
      github: "https://github.com/",
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
