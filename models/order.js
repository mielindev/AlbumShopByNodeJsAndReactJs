"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Order.hasMany(models.OrderDetail, {
        foreignKey: "order_id",
        as: "order_details",
      });
      Order.hasMany(models.Invoice, {
        foreignKey: "order_id",
      });
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
      order_date: DataTypes.DATE,
      status: DataTypes.INTEGER,
      shipping_address: DataTypes.STRING,
      total_amount: DataTypes.INTEGER,
      session_id: DataTypes.STRING,
      note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      underscored: true,
    }
  );
  return Order;
};
