"use strict";
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("cart_items", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    cart_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "carts",
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
    quantity: {
      type: Sequelize.INTEGER,
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
  await queryInterface.dropTable("cart_items");
}
