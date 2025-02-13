"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Promotion.hasMany(models.PromotionDetail, {
        foreignKey: "promotion_id",
      });
    }
  }
  Promotion.init(
    {
      name: DataTypes.STRING,
      percent: DataTypes.DECIMAL,
      active: DataTypes.BOOLEAN,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Promotion",
      tableName: "promotions",
      underscored: true,
    }
  );
  return Promotion;
};
