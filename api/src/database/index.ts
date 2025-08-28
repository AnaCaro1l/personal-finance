import { Sequelize } from "sequelize-typescript";
import { env } from "process";
import dotenv from "dotenv"
import { User } from "../models/User.js";

dotenv.config();

const sequelize = new Sequelize({
  database: env.DB_NAME,
  dialect: "mysql",
  host: env.DB_HOST,
  password: env.DB_PASSWORD,
  username: env.DB_USERNAME,
  port: 3306,
  models: [User]
})
