"use strict";
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("invoices", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    order_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
    },
    invoice_number: {
      type: Sequelize.STRING,
    },
    payment_status: {
      type: Sequelize.INTEGER,
    },
    total_amount: {
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
  await queryInterface.dropTable("invoices");
}
