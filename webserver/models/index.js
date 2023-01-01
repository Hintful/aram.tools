const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.PGDATABASE, dbConfig.PGUSER, dbConfig.PGPASSWORD, {
  host: process.env.PGHOST,
  dialect: "postgres",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.matches = require("./match.js")(sequelize, Sequelize);

module.exports = db;