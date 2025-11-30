import { Model, DataTypes } from "sequelize";
import sequelize from "../database/init.mysqldb.js";

class UserPayment extends Model {}

UserPayment.init(
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
    payment_type: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    provider: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    account_no: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    expiri_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserPayment",
    tableName: "user_payments",
    timestamps: false,
  }
);

export default UserPayment;
