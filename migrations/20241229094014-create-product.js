"use strict";
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("products", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
    },
    artist_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "artists",
        key: "id",
      },
    },
    release_at: {
      type: Sequelize.DATE,
    },
    label_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "labels",
        key: "id",
      },
    },
    description: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.TEXT,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
  await queryInterface.dropTable("products");
}
