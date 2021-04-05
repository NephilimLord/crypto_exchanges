const path = require('path');
const config = {};

config.rootDir = path.join(__dirname, '../');

config.port = 3002;
config.apiToken = ''; // enter your token
config.cronTime = '* * * * *';
config.mysql = {
  host: 'localhost',
  port: 3306,
  username: 'ivan',
  password: '',
  database: 'crypto_exchanges',
};

module.exports = config;