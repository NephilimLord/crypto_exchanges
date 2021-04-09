const path = require('path');
const config = {};

config.rootDir = path.join(__dirname, '../');

config.port = 3002;
config.apiToken = ''; // enter your token
config.cronTime = '* * * * *';
config.mysql = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  username: process.env.MYSQL_USER || 'ivan',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DB || 'crypto_exchanges',
};

module.exports = config;