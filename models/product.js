"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Artist, {
        foreignKey: "artist_id",
      });
      Product.belongsTo(models.Label, {
        foreignKey: "label_id",
      });
      Product.hasMany(models.OrderDetail, {
        foreignKey: "product_id",
      });
      Product.hasMany(models.Feedback, {
        foreignKey: "product_id",
      });
      Product.hasMany(models.NewsDetail, {
        foreignKey: "product_id",
      });
      Product.hasMany(models.FormatDetail, {
        foreignKey: "product_id",
      });
      Product.hasMany(models.GenreDetail, {
        foreignKey: "product_id",
        as: "genres",
      });
      Product.hasMany(models.PromotionDetail, {
        foreignKey: "product_id",
      });
      Product.hasMany(models.CartItem, {
        foreignKey: "product_id",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      artist_id: DataTypes.INTEGER,
      label_id: DataTypes.INTEGER,
      release_at: DataTypes.INTEGER,
      description: DataTypes.STRING,
      image: DataTypes.TEXT,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      underscored: true,
    }
  );
  return Product;
};
