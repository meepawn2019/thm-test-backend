const Sequelize = require("sequelize");
// get the database connection string from the environment
const connectionString = process.env.DATABASE_URL;
const sequelize = new Sequelize(
  process.env.POSTGRES_DB || "thm_database",
  process.env.POSTGRES_USER || "thminsight",
  process.env.POSTGRES_PASSWORD || "coding_test_password",
  {
    host: process.env.PG_HOST || "localhost",
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {},
  }
);

module.exports = sequelize;
