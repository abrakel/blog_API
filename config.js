const dotenv = require('dotenv');
dotenv.config();

const dbUrl = process.env.DB_URL; 
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

module.exports = {
    dbUrl,
    adminEmail,
    adminPassword
};
