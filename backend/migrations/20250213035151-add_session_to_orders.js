"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn("orders", "session_id", {
    type: Sequelize.STRING,
    allowNull: true,
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn("orders", "session_id");
}
