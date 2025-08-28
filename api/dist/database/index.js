"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const process_1 = require("process");
const dotenv_1 = __importDefault(require("dotenv"));
const User_js_1 = require("../models/User.js");
dotenv_1.default.config();
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process_1.env.DB_NAME,
    dialect: "mysql",
    host: process_1.env.DB_HOST,
    password: process_1.env.DB_PASSWORD,
    username: process_1.env.DB_USERNAME,
    port: 3306,
    models: [User_js_1.User]
});
