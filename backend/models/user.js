"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order, {
        foreignKey: "user_id",
      });
      User.hasMany(models.Feedback, {
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.INTEGER,
      phone: DataTypes.STRING,
      address: DataTypes.TEXT,
      avatar: DataTypes.TEXT,
      is_locked: DataTypes.BOOLEAN,
      password_changed_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return User;
};
