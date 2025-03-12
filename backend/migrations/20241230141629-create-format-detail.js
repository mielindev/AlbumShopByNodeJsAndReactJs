"use strict";
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("format_details", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    format_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "formats",
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
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    price: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    old_price: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    stock: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
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
  await queryInterface.dropTable("format_details");
}
