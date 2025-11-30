import { Model, DataTypes } from "sequelize";
import sequelize from "../database/init.mysqldb.js";

class Conversation extends Model {}

Conversation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1, // Or DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_IDs: {
      type: DataTypes.RANGE(DataTypes.STRING(50)),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
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
    modelName: "Conversation",
    tableName: "conversations",
    timestamps: false,
    underscored: true,
  }
);

export default Conversation;
