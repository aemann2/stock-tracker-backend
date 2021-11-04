const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const db = require('./config/db');

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', require('./routes/login'));
app.use('/buy', require('./routes/buy'));
app.use('/sell', require('./routes/sell'));
app.use('/history', require('./routes/history'));
app.use('/quote', require('./routes/quote'));

app.get('/', async (req, res) => {
	try {
		const result = await db.any('SELECT * FROM users;');
		res.send(result);
	} catch (err) {
		console.error(err);
		res.send('Error ' + err);
	}
});

app.listen(port, () => {
	console.log(`Connected on port ${port}`);
});
