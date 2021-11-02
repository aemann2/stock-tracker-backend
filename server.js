const express = require('express');
const app = express();
require('dotenv').config({ path: './config/config.env' });
const port = process.env.PORT || 5000;
const { Client } = require('pg');

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

client.connect();

app.get('/', async (req, res) => {
	try {
		const result = await client.query('SELECT * FROM test;');
		res.send(result.rows);
		client.end();
	} catch (err) {
		console.error(err);
		res.send('Error ' + err);
	}
});

app.post('/', async (req, res) => {
	try {
		const { name } = req.body;
		const query = await client.query('INSERT INTO test(name) VALUES($1)', [
			name,
		]);
		res.send(query);
	} catch (err) {
		console.log(err);
	}
});

app.listen(port, () => {
	console.log(`Connected on port ${port}`);
});
