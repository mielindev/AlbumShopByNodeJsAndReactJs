"use strict";
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("genre_details", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    genre_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "genres",
        key: "id",
      },
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("genre_details");
}
