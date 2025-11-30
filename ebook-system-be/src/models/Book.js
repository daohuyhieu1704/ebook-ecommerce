import { Model, DataTypes } from "sequelize";
import sequelize from "../database/init.mysqldb.js";
import Author from './Author.js';
import Category from './Category.js';
import Inventory from './Inventory.js';

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1, // Or DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // author_ID : {
    //   type: DataTypes.UUID,
    //   allowNull: true,
    //   references: {
    //     model: Author,
    //     key: 'id'
    //   }
    // },
    // category_ID : {
    //     type: DataTypes.UUID,
    //     allowNull: true,
    //     references: {
    //       model: Category,
    //       key: 'id'
    //     }
    // },
    // inventory_ID : {
    //     type: DataTypes.UUID,
    //     allowNull: true,
    //     references: {
    //       model: Inventory,
    //       key: 'id'
    //     }
    // },    
    price: {
      type: DataTypes.NUMBER,
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
    modelName: "Book",
    tableName: "books",
    timestamps: false,

  }
);

Book.belongsTo(Author, { foreignKey: 'author_ID' })
Book.belongsTo(Category, { foreignKey: 'category_ID' })
Book.belongsTo(Inventory, { foreignKey: 'inventory_ID' })

Author.hasOne(Book, { foreignKey: 'author_ID' })
Category.hasOne(Book, { foreignKey: 'category_ID' })
Inventory.hasOne(Book, { foreignKey: 'inventory_ID' })
export default Book;
