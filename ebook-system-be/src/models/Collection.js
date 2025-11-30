import { Model, DataTypes } from "sequelize";
import sequelize from "../database/init.mysqldb.js";

class Collection extends Model {}

Collection.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1, // Or DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_ID: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    img: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    modified_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Collection",
    tableName: "collections",
    timestamps: false,
    underscored: true,
  }
);

export default Collection;
