"use strict";
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("promotion_details", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    promotion_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "promotions",
        key: "id",
      },
    },
    product_id: {
      type: Sequelize.INTEGER,
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
  await queryInterface.dropTable("promotion_details");
}
