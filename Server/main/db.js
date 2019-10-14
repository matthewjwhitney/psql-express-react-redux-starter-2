const { Pool, Client } = require('pg')


const pool = new Pool({
  user: process.env.USERNAME,
  host: process.env.HOSTNAME,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD,
  port: process.env.PORT
})

module.exports = pool;
