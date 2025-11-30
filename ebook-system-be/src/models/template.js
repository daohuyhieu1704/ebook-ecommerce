import { Model, DataTypes } from "sequelize";
import sequelize from "../database/init.mysqldb.js";

class Template extends Model {}

Template.init(
  {
    tem_name: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
    },
    tem_html: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Template",
    tableName: "templates",
    timestamps: false,
  }
);

export default Template;
