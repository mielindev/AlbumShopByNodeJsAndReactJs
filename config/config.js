import dotenv from "dotenv";

dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_DV_USERNAME,
    password: process.env.DB_DV_PASSWORD ? process.env.DB_DV_PASSWORD : null,
    database: process.env.DB_DV_DATABASE,
    host: process.env.DB_DV_HOST,
    dialect: process.env.DB_DV_DIALECT,
  },
};

// export const test = {
//   username: "root",
//   password: null,
//   database: "database_test",
//   host: "127.0.0.1",
//   dialect: "mysql",
// };
// export const production = {
//   username: "root",
//   password: null,
//   database: "database_production",
//   host: "127.0.0.1",
//   dialect: "mysql",
// };
