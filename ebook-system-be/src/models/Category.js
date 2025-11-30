import { Model, DataTypes } from "sequelize";
import sequelize from "../database/init.mysqldb.js";
import Book from "./Book.js";

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1, // Or DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "categorys",
    timestamps: false,
    underscored: true,
  }
);

export default Category;
