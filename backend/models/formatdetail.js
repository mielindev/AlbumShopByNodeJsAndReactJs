"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FormatDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FormatDetail.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "format_details",
      });
      FormatDetail.belongsTo(models.Format, {
        foreignKey: "format_id",
        as: "format",
      });
    }
  }
  FormatDetail.init(
    {
      format_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      old_price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "FormatDetail",
      tableName: "format_details",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return FormatDetail;
};
