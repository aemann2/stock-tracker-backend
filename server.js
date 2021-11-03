const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const db = require('./config/db');

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
	try {
		const result = await db.any('SELECT * FROM test;');
		res.send(result);
	} catch (err) {
		console.error(err);
		res.send('Error ' + err);
	}
});

app.post('/', async (req, res) => {
	try {
		const { name } = req.body;
		const query = await db.query('INSERT INTO test(name) VALUES($1)', [name]);
		res.send(query);
	} catch (err) {
		console.log(err);
	}
});

app.listen(port, () => {
	console.log(`Connected on port ${port}`);
});
