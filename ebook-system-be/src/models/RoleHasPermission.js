import { Model, DataTypes } from "sequelize";
import sequelize from "../database/init.mysqldb.js";

class RoleHasPermission extends Model {}

RoleHasPermission.init(
  {
    role_ID: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
    },
    permission_ID: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "RoleHasPermission",
    tableName: "role_has_permissions",
    timestamps: false,
  }
);

export default RoleHasPermission;
