'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Restaurants", "name_en", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Restaurants", "category", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Restaurants", "image", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("Restaurants", "location", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Restaurants", "phone", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Restaurants", "google_map", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Restaurants", "rating", {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn("Restaurants", "description", {
      type: Sequelize.STRING,
      allowNull: true,
    })

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
