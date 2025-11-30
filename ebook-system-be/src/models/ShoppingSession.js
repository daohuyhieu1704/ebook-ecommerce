import { Model, DataTypes } from "sequelize";
import sequelize from "../database/init.mysqldb.js";
import User from "./User.js";
import CartItem from "./CartItem.js";

class ShoppingSession extends Model {}

ShoppingSession.init(
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
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ShoppingSession",
    tableName: "shoping_sessions",
    timestamps: false,
  }
);

ShoppingSession.belongsTo(User, { foreignKey: "user_ID" });
User.hasMany(ShoppingSession, { foreignKey: "user_ID" });
ShoppingSession.hasMany(CartItem, { foreignKey: "session_ID" });
CartItem.belongsTo(ShoppingSession, { foreignKey: "session_ID" });

export default ShoppingSession;
