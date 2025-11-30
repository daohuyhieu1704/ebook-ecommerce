import dotenv from "dotenv";
import { Sequelize } from "sequelize";

const { config } = dotenv;
config();
let db_name = process.env.DB_NAME;
let db_username = process.env.DB_USERNAME;
let db_password = process.env.DB_PASSWORD;
let db_host = process.env.DB_HOST;

const sequelize = new Sequelize(db_name, db_username, db_password || "", {
  host: db_host,
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default sequelize;
