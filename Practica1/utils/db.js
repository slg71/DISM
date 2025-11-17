/* eslint-disable linebreak-style */
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'p1_dism',
}).promise();

module.exports = pool;
