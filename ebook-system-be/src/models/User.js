import { Model, DataTypes } from "sequelize";
import sequelize from "../database/init.mysqldb.js";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1, // Or DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone_number: {
      type: DataTypes.STRING(12),
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    enable: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 1,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
    modelName: "User",
    tableName: "users",
    timestamps: false,
    underscored: true,
  }
);

export default User;
