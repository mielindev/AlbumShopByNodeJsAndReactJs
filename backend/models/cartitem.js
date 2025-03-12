"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartItem.belongsTo(models.Cart, {
        foreignKey: "cart_id",
      });
      CartItem.belongsTo(models.Product, {
        foreignKey: "product_id",
      });
    }
  }
  CartItem.init(
    {
      cart_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      format_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CartItem",
      tableName: "cart_items",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return CartItem;
};
