const dotenv = require('dotenv');
dotenv.config();

const dbUrl = process.env.DB_URL; 
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const PORT = process.env.PORT || 3000;

module.exports = {
    dbUrl,
    adminEmail,
    adminPassword,
    PORT
};
