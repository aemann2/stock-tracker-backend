require('dotenv').config({ path: './config/config.env' });
const pgp = require('pg-promise')();

const cn = {
	host: process.env.HOST,
	port: 5432,
	database: process.env.DATABASE,
	user: process.env.USERNAME,
	password: process.env.PASSWORD,
	ssl: {
		rejectUnauthorized: false,
	},
};

const db = pgp(cn);

module.exports = db;
