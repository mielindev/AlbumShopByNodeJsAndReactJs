"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Feedback.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Feedback.belongsTo(models.Product, {
        foreignKey: "product_id",
      });
    }
  }
  Feedback.init(
    {
      user_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      rating: DataTypes.DECIMAL,
      comment: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Feedback",
      tableName: "feedbacks",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Feedback;
};
