"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.belongsTo(models.Order, {
        foreignKey: "order_id",
      });
    }
  }
  Invoice.init(
    {
      order_id: DataTypes.INTEGER,
      invoice_number: DataTypes.STRING,
      payment_status: DataTypes.INTEGER,
      total_amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Invoice",
      tableName: "invoices",
      underscored: true,
    }
  );
  return Invoice;
};
