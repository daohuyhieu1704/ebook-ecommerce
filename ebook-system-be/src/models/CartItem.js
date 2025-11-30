import { Model, DataTypes } from "sequelize";
import sequelize from "../database/init.mysqldb.js";
import Book from "./Book.js";

class CartItem extends Model {}

CartItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1, // Or DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    session_ID: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    book_ID: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    checked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CartItem",
    tableName: "cart_items",
    timestamps: false,
  }
);

CartItem.belongsTo(Book, { foreignKey: "book_ID", as: "book" });
Book.hasMany(CartItem, { foreignKey: "book_ID", as: "bookItems" });

export default CartItem;
