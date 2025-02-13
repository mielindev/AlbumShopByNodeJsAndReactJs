"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GenreDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GenreDetail.belongsTo(models.Genre, {
        foreignKey: "genre_id",
        as: "genre",
      });
      GenreDetail.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "genres",
      });
    }
  }
  GenreDetail.init(
    {
      genre_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "GenreDetail",
      tableName: "genre_details",
      underscored: true,
    }
  );
  return GenreDetail;
};
