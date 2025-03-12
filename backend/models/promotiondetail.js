"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PromotionDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PromotionDetail.belongsTo(models.Promotion, {
        foreignKey: "promotion_id",
      });
      PromotionDetail.belongsTo(models.Product, {
        foreignKey: "product_id",
      });
    }
  }
  PromotionDetail.init(
    {
      promotion_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PromotionDetail",
      tableName: "promotion_details",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return PromotionDetail;
};
