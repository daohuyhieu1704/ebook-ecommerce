import { Model, DataTypes } from "sequelize";
import sequelize from "../database/init.mysqldb.js";

class Token extends Model {}

Token.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1, // Or DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_ID: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    enable: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 1,
    }
  },
  {
    sequelize,
    modelName: "Token",
    tableName: "tokens",
    timestamps: false,
  }
);

export default Token;
