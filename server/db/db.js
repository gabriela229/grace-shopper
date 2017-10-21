const Sequelize = require('sequelize');

console.log(require('pg').defaults)

const db = new Sequelize(
    process.env.DATABASE_URL ||
    'postgres://localhost:5432/graceshopper', {
        logging: false
    }
);
module.exports = db;