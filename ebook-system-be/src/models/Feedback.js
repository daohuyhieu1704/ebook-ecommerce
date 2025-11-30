import { Model, DataTypes } from "sequelize";
import sequelize from "../database/init.mysqldb.js";
import User from "./User.js";

class Feedback extends Model {}

Feedback.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1, // Or DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    book_ID: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    user_ID: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    star: {
      type: DataTypes.TINYINT,
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
    sequelize,
    modelName: "Feedback",
    tableName: "feedbacks",
    timestamps: false,
  }
);

Feedback.belongsTo(User, { foreignKey: "user_ID", as: "book" });
User.hasMany(Feedback, { foreignKey: "user_ID" });

export default Feedback;
