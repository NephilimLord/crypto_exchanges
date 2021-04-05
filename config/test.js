const path = require('path');
const config = {};

config.rootDir = path.join(__dirname, '../');

config.port = 34567;
config.jwtAccessSecret = 'chuck-suca-norris';
config.jwtRefreshSecret = 'jecky-matherfucker-chun';
config.jwtAdminSecret = 'rembo-sucker-for-pain';
config.mongo = 'mongodb://localhost:27017/gologin-test';
config.mailgunApiKey = process.env.MAILGUN_API_KEY || '1234';
config.mailgunDomail = process.env.MAILGUN_DOMAIN || '5678';
config.awsBucketName = 'gprofiles.gologin';
config.awsKeyId = 'H412UOOO12345I0BveQx5/cuTzqwerP/79tOQWER';
config.awsAccessKey = 'QWERTYASDFGZXCVBNW43H';
config.geolocationApiKey = 'e8a39dadfb844ca3aeae25067fe1b792';

config.kubeConfig = config.rootDir + '/kubeconfig.yaml';

module.exports = config;
