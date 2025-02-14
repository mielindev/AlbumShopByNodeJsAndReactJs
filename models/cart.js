"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.hasMany(models.CartItem, {
        foreignKey: "cart_id",
        as: "cart_items",
      });
    }
  }
  Cart.init(
    {
      user_id: DataTypes.INTEGER,
      session_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "carts",
      underscored: true,
    }
  );
  return Cart;
};
