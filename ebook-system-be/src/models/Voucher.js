import { Model, DataTypes } from "sequelize";
import sequelize from "../database/init.mysqldb.js";

class Voucher extends Model {}

Voucher.init(
  {
    // Define schema based on your SQL table structure
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1, // Or DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    discount: {
      type: DataTypes.INT,
      allowNull: false,
    },
    active: {
      type: DataTypes.TINYINT(1),
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
    modelName: "Voucher",
    tableName: "vouchers", // Explicitly specify the table name
    timestamps: false, // No timestamp columns in your table
  }
);

export default Voucher;
