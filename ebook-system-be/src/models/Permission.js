import { Model, DataTypes } from "sequelize";
import sequelize from "../database/init.mysqldb.js";

class Permission extends Model {}

Permission.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1, // Or DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    can_create_account: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0,
    },
    can_modify_account: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0,
    },
    can_delete_account: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0,
    },
    can_create_book: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0,
    },
    can_modify_book: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0,
    },
    can_delete_book: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0,
    },
    can_modify_payment: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0,
    },
    can_delete_feedback: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0,
    },
    can_reply_message: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Permission",
    tableName: "permissions",
    timestamps: false,
  }
);

export default Permission;
