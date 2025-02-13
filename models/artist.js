"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Artist.hasMany(models.Product, {
        foreignKey: "artist_id",
      });
    }
  }
  Artist.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.TEXT,
      bio: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Artist",
      tableName: "artists",
      underscored: true,
    }
  );
  return Artist;
};
