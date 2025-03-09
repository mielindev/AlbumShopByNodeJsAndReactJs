"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Format extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Format.hasMany(models.FormatDetail, {
        foreignKey: "format_id",
        as: "format",
      });
    }
  }
  Format.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Format",
      tableName: "formats",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Format;
};
