"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Label extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Label.hasMany(models.Product, {
        foreignKey: "label_id",
      });
    }
  }
  Label.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.TEXT,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Label",
      tableName: "labels",
      underscored: true,
    }
  );
  return Label;
};
