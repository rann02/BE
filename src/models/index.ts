import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();
const DB = process.env.DBNAME as string;
const USERDB = process.env.USERDB as string;
const PASSWORDDB = process.env.PASSWORDDB as string;

const sequelize = new Sequelize(DB, USERDB, PASSWORDDB, {
  dialect: "mysql",
});

export default sequelize;
