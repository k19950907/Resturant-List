'use strict';

const restaurants = require("../public/jsons/restaurant.json").results

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = restaurants.map(restaurant => ({
      ...restaurant,
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    await queryInterface.bulkInsert("Restaurants", data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Restaurants", null, {})
  }
};
