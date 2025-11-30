import { Model, DataTypes } from "sequelize";
import sequelize from "../database/init.mysqldb.js";

class CollectionDetail extends Model {}

CollectionDetail.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1, // Or DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    collection_ID: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    book_ID: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "CollectionDetail",
    tableName: "collection_details",
    timestamps: false,
    underscored: true,
  }
);

export default CollectionDetail;
