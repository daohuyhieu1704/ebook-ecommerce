import { Model, DataTypes } from "sequelize";
import sequelize from "../database/init.mysqldb.js";

class Message extends Model {}

Message.init(
  {
    // Define schema based on your SQL table structure
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1, // Or DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    sender_ID: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    conversation_ID: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(5),
      allowNull: false,
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
    // Sequelize options
    sequelize, // Pass the connection instance
    modelName: "Message",
    tableName: "messages", // Explicitly specify the table name
    timestamps: false, // No timestamp columns in your table
  }
);

export default Message;
